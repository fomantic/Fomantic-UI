#!/bin/bash
cp semantic.json.example semantic.json
sed -i '/"autoInstall": false/s/false/true/' semantic.json
