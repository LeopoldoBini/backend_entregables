import minimist from "minimist";

const options = {
  alias: {
    p: "puertoFromArgv",
    m: "mode",
  },

  default: {
    puertoFromArgv: 8080,
    mode: "FORK",
  },
};

const { puertoFromArgv , mode } = minimist(process.argv.slice(2), options)
const argvs = { puertoFromArgv, mode }

export default argvs;