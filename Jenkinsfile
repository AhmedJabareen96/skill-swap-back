pipeline {
    agent any
    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/AhmedJabareen96/skill-swap-front.git'
            }
        }
        stage('Build and Push Docker Image') {
        environment {
                        registry = 'docker-registry-url'
                        imageName = 'skillswap-front'
                        imageTag = 'latest'
                    }
            steps {
                script {
                    def dockerImage = docker.build(imageName)
                    docker.withRegistry(registry, 'docker-credentials-id') {
                        dockerImage.push("${env.BUILD_NUMBER}")
                        dockerImage.push("latest")
                    }
                }
            }
        }
    }
}