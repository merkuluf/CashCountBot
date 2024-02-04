import prisma from './client.js'

export async function testDatabaseConnection() {
    try {
        await prisma.$connect()
        console.log('Connected to the database successfully.')
    } catch (error) {
        console.error('Error connecting to the database:', error)
    } finally {
        await prisma.$disconnect()
    }
}
