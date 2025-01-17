# Make sure RUBY_VERSION matches the Ruby version in .ruby-version
ARG RUBY_VERSION=3.3.6
FROM ghcr.io/rails/devcontainer/images/ruby:$RUBY_VERSION

RUN sudo apt-get update && sudo apt-get install -y \
    fonts-powerline postgresql-client postgresql-contrib libpq-dev \
    ffmpeg mupdf mupdf-tools libvips-dev poppler-utils \
    libxml2-dev sqlite3 imagemagick \
    && sudo apt-get clean \
    && sudo rm -rf /var/lib/apt/lists/*

RUN git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ~/.oh-my-zsh/themes/powerlevel10k

ENV TERM=xterm-256color