# only for local build

FROM registry.opensuse.org/home/kwk/elemental/images/opensuse_leap_15.3/rancher/ros-builder-image-opensuse/15.3:latest
ARG CACHEBUST
ENV LUET_NOLOCK=true
RUN ["luet", \
    "install", "--no-spinner", "-d", "-y", \
    "meta/cos-minimal"]

ARG IMAGE_TAG=latest

# Starting from here are the lines needed for RancherOS to work

# IMPORTANT: Setup rancheros-release used for versioning/upgrade. The 
# values here should reflect the tag of the image being built
ARG IMAGE_REPO=norepo
RUN echo "IMAGE_REPO=${IMAGE_REPO}"          > /usr/lib/rancheros-release && \
    echo "IMAGE_TAG=${IMAGE_TAG}"           >> /usr/lib/rancheros-release && \
    echo "IMAGE=${IMAGE_REPO}:${IMAGE_TAG}" >> /usr/lib/rancheros-release

# Rebuild initrd to setup dracut with the boot configurations
RUN mkinitrd && \
    # aarch64 has an uncompressed kernel so we need to link it to vmlinuz
    kernel=$(ls /boot/Image-* | head -n1) && \
    if [ -e "$kernel" ]; then ln -sf "${kernel#/boot/}" /boot/vmlinuz; fi