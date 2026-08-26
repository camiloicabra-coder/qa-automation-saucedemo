pipeline {

    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Run Cypress tests') {
            steps {
                sh 'npm run test:e2e'
            }
        }
    }
}