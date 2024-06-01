#!/bin/bash

CONTEST_ID=$1
TASK_ID=$2

if [ -z "$CONTEST_ID" ]; then
  echo "ContestIdを指定してください。"
  exit 1
fi

if [ -z "$TASK_ID" ]; then
  echo "TaskIdを指定してください。"
  exit 1
fi

# if [ -z "$LANGAGE" ]; then
#   echo "言語を指定してください。"
#   exit 1
# fi

cd contests/"${CONTEST_ID}"/"${TASK_ID}"/  && oj -t