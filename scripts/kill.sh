#!/bin/bash

# Kill processes running on ports
lsof -i TCP:3084 | grep LISTEN | awk '{print $2}' | xargs kill -9
lsof -i TCP:3000 | grep LISTEN | awk '{print $2}' | xargs kill -9
