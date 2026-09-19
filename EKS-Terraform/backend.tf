terraform {
  backend "s3" {
    bucket       = "murthychiluka143"
    key          = "terraform.tfstate"
    region       = "us-east-1"
    use_lockfile = true
  }
}
