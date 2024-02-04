import app from './index.js'
const port = process.env.PORT || 3000
import { testDatabaseConnection } from './prisma/testConnect.js'

app.listen(port, async () => {
    console.log(`App listening at http://localhost:${port}`)
    await testDatabaseConnection()
})
