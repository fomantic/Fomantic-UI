workflow "build test" {
  on = "push"
  resolves = [
    "ls dist",
    "cat semantic.json",
  ]
}

action "preinstall" {
  uses = "docker://node:8"
  runs = "sh"
  args = "preinstall.sh"
}

action "install dependencies" {
  uses = "actions/npm@6309cd9"
  needs = ["preinstall"]
  runs = "npm"
  args = "install"
}

action "gulp build" {
  uses = "docker://node:8"
  needs = ["install dependencies"]
  runs = "npx"
  args = "gulp build"
}

action "ls dist" {
  uses = "docker://node:8"
  needs = ["gulp build"]
  runs = "ls"
  args = "-la dist/"
}

action "ls project directory" {
  uses = "docker://node:8"
  needs = ["preinstall"]
  runs = "ls"
  args = "-la"
}

action "cat semantic.json" {
  uses = "docker://node:8"
  needs = ["ls project directory"]
  runs = "cat"
  args = "semantic.json"
}
