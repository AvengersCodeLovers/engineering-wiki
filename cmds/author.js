exports.command = 'author <command>'
exports.desc = 'Manage Author'
exports.builder = function (yargs) {
  return yargs.commandDir('author')
}
exports.handler = function (argv) {}
