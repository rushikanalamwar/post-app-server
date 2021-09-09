set -ue
DOCKER_USER="$(id -u):$(id -g)"
function terraform {
  docker run --rm --user ${DOCKER_USER} -v $(pwd):/app --workdir /app hashicorp/terraform:0.12.24 $@
}


cat > terraform.tfvars <<EOF
AWS_ACCESS_KEY_ID="AKIAW5TZYZLZMWES4Z76"
AWS_SECRET_ACCESS_KEY="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"
AWS_REGION="ap-south-1"

EOF

cat > backend.tf <<EOF
terraform {
  backend "s3" {
    bucket = "terraform-backends-fasalsetu"
    key    = "muon-task.tfbackend"
    region = "ap-south-1"
  }
}
EOF

cat > config.tfbackend <<EOT
access_key = "AKIAW5TZYZLZMWES4Z76"
secret_key = "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"
region = "ap-south-1"
EOT

terraform init -reconfigure -backend-config=config.tfbackend

terraform apply -lock=true -auto-approve

