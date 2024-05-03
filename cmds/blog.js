exports.command = 'blog <command>'
exports.desc = 'Manage Blog'
exports.builder = function (yargs) {
  return yargs.commandDir('blog')
}
exports.handler = function (argv) {}
