FROM node:14 AS dependencies
WORKDIR /app
COPY package*.json ./
RUN npm install

FROM node:14 AS builder
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN npm install

FROM node:14 AS runner
WORKDIR /app
ENV NODE_ENV production

RUN groupadd -g 1010 -r nodejs
RUN useradd -r nextjs -u 1001

# COPY --from=builder /app/next.config.js ./
#COPY --from=builder /app/public ./public
#COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
#COPY --from=builder /app/crons ./crons
COPY . .


# -----------------------------------------------------------------------------
# SSH configuration
# -----------------------------------------------------------------------------


RUN apt-get clean
RUN apt-get update
RUN apt-get install openssh-server -y
RUN apt-get install nano
RUN apt-get install tzdata -y

ENV TZ="America/New_York"

RUN service ssh start

ARG STG_ROOT_PW
RUN mkdir -p /var/log/supervisor
# RUN mkdir /var/run/sshd
RUN echo "root:$STG_ROOT_PW" | chpasswd
RUN sed -i 's/PermitRootLogin without-password/PermitRootLogin yes/' /etc/ssh/sshd_config

# SSH login fix. Otherwise user is kicked off after login
RUN sed 's@session\s*required\s*pam_loginuid.so@session optional pam_loginuid.so@g' -i /etc/pam.d/sshd

# ENV NOTVISIBLE "in users profile"
RUN echo "export VISIBLE=now" >> /etc/profile

EXPOSE 80 3000 22

CMD ["node", "app.js"]
