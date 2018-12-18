workflow "build test" {
  on = "push"
  resolves = ["install dependencies"]
}

action "preinstall" {
  uses = "docker://node"
  runs = "sh"
  args = "preinstall.sh"
}

action "install dependencies" {
  uses = "actions/npm@6309cd9"
  needs = ["preinstall"]
  runs = "npm"
  args = "install"
}
