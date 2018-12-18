workflow "build test" {
  on = "push"
  resolves = ["ls dist"]
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

workflow "New workflow" {
  on = "push"
}

action "ls dist" {
  uses = "docker://node"
  needs = ["install dependencies"]
  runs = "ls"
  args = "-la dist/"
}
