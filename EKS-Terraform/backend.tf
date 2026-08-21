terraform {
  backend "s3" {
    bucket       = "devncloudtechdevops"
    key          = "terraform.tfstate"
    region       = "us-east-1"
    use_lockfile = true
  }
}
