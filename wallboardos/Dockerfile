ARG base_image=quay.io/costoolkit/os2:v0.1.0-alpha19-amd64
FROM ${base_image}

# Install needed packages for minimal desktop environment.
# Running w/o DE resulted in errors
RUN zypper in -y xinit xhost accountsservice xorg-x11 xorg-x11-server \
lxde-common lxde-common-branding-openSUSE \
lxpanel lxpanel-lang lxrandr \
lxsession openbox; \
zypper clean -a


# Auto login to lxde as "user"
RUN useradd -m user
COPY xinitrc /home/user/.xinitrc
COPY bash_profile /home/user/.bash_profile
COPY autologin.conf /usr/lib/systemd/system/getty@tty1.service.d/90-autologin.conf

# Set runlevel to multi-user so startx can be run by above scripts
RUN systemctl disable display-manager
RUN systemctl set-default multi-user
