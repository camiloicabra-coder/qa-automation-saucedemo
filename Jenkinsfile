pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Run Cypress tests') {
            steps {
                sh '''
                    docker run --rm qa-automation-saucedemo
                '''
            }
        }
    }

    post {
        always {
            echo 'Pipeline finalizado'
        }

        success {
            echo '✅ Todos los tests de Cypress pasaron correctamente'
        }

        failure {
            echo '❌ Uno o más tests fallaron'
        }
    }
}