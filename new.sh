#!/bin/bash

CONTEST_ID=$1

if [ -z "$CONTEST_ID" ]; then
  echo "ContestIdを指定してください。"
  exit 1
fi

cd contests && acc new "$CONTEST_ID"