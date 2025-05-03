# Stage 1: Build the React application
FROM node:20 as builder

# Set working directory
WORKDIR /app

# --- Variabili d'ambiente per la build ---
# Definisci gli argomenti che riceverai da docker-compose build
ARG REACT_APP_SUPABASE_URL
ARG REACT_APP_SUPABASE_ANON_KEY

# Imposta le ENV *all'interno* di questa fase di build usando gli ARG ricevuti.
# npm run build leggerà queste variabili.
ENV REACT_APP_SUPABASE_URL=${REACT_APP_SUPABASE_URL}
ENV REACT_APP_SUPABASE_ANON_KEY=${REACT_APP_SUPABASE_ANON_KEY}
# ------------------------------------------

# Copy package.json and package-lock.json/yarn.lock
COPY package*.json ./
# If using yarn
# COPY yarn.lock ./

# Install dependencies
RUN npm install
# If using yarn
# RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build
# If using yarn
# RUN yarn build

# Stage 2: Serve the built application with Nginx
FROM nginx:alpine

# Copy the built files from the builder stage to Nginx's public directory
COPY --from=builder /app/build /usr/share/nginx/html

# Copy Nginx configuration (optional, but recommended for SPAs)
# Create a file named nginx.conf in the same directory as your Dockerfile
# with configuration suitable for a React SPA (e.g., try_files index.html)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 (where Nginx listens)
EXPOSE 80

# Command to run Nginx
CMD ["nginx", "-g", "daemon off;"]
