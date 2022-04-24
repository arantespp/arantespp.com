#!/bin/sh

IMAGE_PATH="$1"
IMAGE_DIR="$(dirname "$IMAGE_PATH")"
IMAGE_BASENAME="$(basename "$IMAGE_PATH")"
IMAGE_NAME="${IMAGE_BASENAME%.*}"

cwebp -q 70 -resize 1024 0 "$IMAGE_PATH" -o "$IMAGE_DIR/$IMAGE_NAME.webp"


