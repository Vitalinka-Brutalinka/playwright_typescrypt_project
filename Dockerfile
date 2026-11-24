#Base Image
FROM mcr.microsoft.com/playwright:v1.63.0-noble 

#Set the working directory
WORKDIR /playwright-test

#Copy packagefiles
COPY package*.json ./

#Install dependencies 
RUN npm install

#Copying files
COPY . . 
#coppy all files from diercrory to container (this is 2 dots comand);

#Run tests
CMD ["npx", "playwright", "test", "--project=e2e"]
