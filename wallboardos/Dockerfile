FROM quay.io/costoolkit/os2:v0.1.0-alpha17-amd64
RUN zypper in -y xinit xhost accountsservice xorg-x11 xorg-x11-server \
    branding-openSUSE \
    lxde-common-branding-openSUSE lxde-common \
    patterns-lxde-lxde \
    ;zypper clean -a
RUN systemctl set-default graphical

RUN zypper in -y xinit xhost accountsservice xorg-x11 xorg-x11-server \
lxappearance lxappearance-lang lxappearance-obconf \
lxde-common lxde-common-branding-openSUSE lxinput lxmenu-data \
lxpanel lxpanel-lang lxrandr \
lxsession \
lxterminal-lang nuoveXT2-icon-theme \
obconf openbox; zypper clean -a

COPY xinitrc /root/.xinitrc
COPY bash_profile /root/.bash_profile
COPY autologin.conf /usr/lib/systemd/system/getty@tty1.service.d/autologin.conf

RUN useradd -m user
COPY xinitrc /home/user/.xinitrc
COPY bash_profile /home/user/.bash_profile
RUN systemctl disable display-manager
RUN systemctl set-default multi-user