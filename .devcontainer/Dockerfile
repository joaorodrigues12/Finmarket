# Base image with Node.js and Python
FROM mcr.microsoft.com/devcontainers/javascript-node:20-bullseye

# Install Python and dependencies
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends \
    python3 \
    python3-pip \
    python3-venv \
    build-essential \
    git \
    curl \
    wget \
    vim \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Create symlink for python
RUN ln -s /usr/bin/python3 /usr/local/bin/python

# Install global npm packages
RUN npm install -g expo-cli @expo/ngrok yarn

# Set working directory
WORKDIR /workspace

# Install Python packages globally
COPY ../backend/requirements.txt /tmp/requirements.txt
RUN pip3 install --no-cache-dir -r /tmp/requirements.txt

# Set environment variables
ENV PYTHONUNBUFFERED=1
ENV NODE_ENV=development

# Expose ports
EXPOSE 19000 19001 19002 8000 8081 6379

# Keep container running
CMD ["sleep", "infinity"]
