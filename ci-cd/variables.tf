
variable "aws_region" {
  description = "AWS region to launch servers."
  default     = "ap-south-1"
}
variable "env" {
  description = "Targeted Depolyment environment"
  default     = "dev"
}
variable "repoName" {
  description = "muon-task"
  default     = "muon-task"
}
variable "muon-task_branch" {
  description = "default branch"
  default     = "master"
}

variable "artifacts_bucket_name" {
  description = "sakethkpipelinebucket2"
  default="sakethkpipelinebucket2"
}

variable "AWS_ACCESS_KEY_ID" {
}

variable "AWS_SECRET_ACCESS_KEY" {
}