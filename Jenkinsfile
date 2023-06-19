pipeline {
    agent any
    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/AhmedJabareen96/skill-swap-back.git'
            }
        }
        stage('Build and Push Docker Image') {
        environment {
                        registry = 'ahmedjabareen/skillswap-back'
                        imageName = 'skillswap-back'
                        imageTag = 'latest'
                    }
            steps {
                script {
                    def dockerImage = docker.build(imageName)
                    docker.withRegistry(registry, 'docker-key') {
                        dockerImage.push("${env.BUILD_NUMBER}")
                        dockerImage.push("latest")
                    }
                }
            }
        }
    }
}