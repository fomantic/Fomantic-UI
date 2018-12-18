workflow "build test" {
  on = "push"
  resolves = [
    "gulp install",
    "install dependencies",
  ]
}

action "preinstall" {
  uses = "docker://node:8"
  runs = "sh"
  args = "preinstall.sh"
}

action "install dependencies" {
  uses = "docker://node:8"
  needs = ["preinstall"]
  runs = "npm"
  args = "install"
}

action "gulp install" {
  uses = "docker://node:8"
  needs = ["install dependencies"]
  runs = "npx"
  args = "gulp install"
}
