# output "code_build_project" {
#   value = aws_codebuild_project.muon-task.arn
# }
# output "muon-task_sakethkpipeline2"  {
#   value = aws_codepipeline.muon-task_sakethkpipeline2.arn
# }

output "repo"  {
  value = aws_codecommit_repository.repo.clone_url_http
}