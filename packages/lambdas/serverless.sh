#!/bin/bash
# trap ctrl-c and call ctrl_c()
trap ctrl_c INT

function ctrl_c() {
        echo "" > serverless.yml
}

POSITIONAL=()
while [[ $# -gt 0 ]]
do
key="$1"

case $key in
    -c|--config)
    CONFIG="$2"
    shift # past argument
    shift # past value
    ;;
    *)    # unknown option
    POSITIONAL+=("$1") # save it in an array for later
    shift # past argument
    ;;
esac
done
set -- "${POSITIONAL[@]}" # restore positional parameters

echo "Looking for config [" $CONFIG "]"


echo "### Running serverless with config file" $CONFIG "ARGUMENTS:" $@ "###"
echo "" > serverless.yml
yes | cp -rf $CONFIG serverless.yml
serverless $@ || echo "" > serverless.yml
echo "" > serverless.yml