pipeline {
    agent {
        docker { 
            image 'node:carbon'
            args '-u root:root'
        }
        // dockerfile true
    }

    stages {
        stage('Build') {
            steps {
                echo 'Building..'
                sh 'pwd'
                sh 'npm install'
                sh 'npm run build --production'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
                sh 'npm run test'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}