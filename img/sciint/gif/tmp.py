# reads {0..4}.png and full.png

import cv2
import imageio

images = []
for i in range(5):
    images.append(imageio.imread(f"{i}.png"))
images.append(imageio.imread("full.png"))

print([i.shape for i in images])

# pad 0.png by 2px on top
import numpy as np

images[0] = np.pad(
    images[0], ((2, 0), (0, 0), (0, 0)), mode="constant", constant_values=255
)

print([i.shape for i in images])

# resize full.png to so largest dimension is 1000px

full = images[-1]
h, w = full.shape[:2]
if w > h:
    new_w = 1000
    new_h = int(h / w * 1000)
else:
    new_h = 1000
    new_w = int(w / h * 1000)
full = cv2.resize(full, (new_w, new_h), interpolation=cv2.INTER_LANCZOS4)
images[-1] = full


# pad images by (1000-w)/2 on left and right
# then (1000-h)/2 on top and bottom

for i in range(len(images)):
    h, w = images[i].shape[:2]
    print(w, h)
    hpad = (1000 - w) // 2
    vpad = (1000 - h) // 2
    print(hpad, vpad)
    images[i] = np.pad(
        images[i].copy(),
        ((0, 0), (hpad + (1 if w % 2 == 1 else 0), hpad), (0, 0)),
        mode="constant",
        constant_values=255,
    )
    images[i] = np.pad(
        images[i].copy(),
        ((vpad + (1 if h % 2 == 1 else 0), vpad), (0, 0), (0, 0)),
        mode="constant",
        constant_values=255,
    )


# makes a gif that loops
from PIL import Image
import imageio.v3 as iio

images.append(images[-1])

# 4x the nframes

iio.imwrite('output.mp4', images, codec='libx264', fps=3)

