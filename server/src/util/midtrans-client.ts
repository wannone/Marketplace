// import type { Transaction } from "../model/model"

// const midtransClient = require('midtrans-client')

// let snap = new midtransClient.Snap({
//     isProduction: false,
//     serverKey: process.env.SERVER_KEY,
// })

// export async function createMidtransClient(data : Transaction) {
//     try {
//         const transaction = {
//             "transaction_details": {
//                 "order_id": generateUUID(),
//                 "gross_amount": data.gross_amount,
//             },
//         }

//         const token = await snap.createTransaction(transaction)
//         console.log(token)
//         return token
//     } catch (error) {
//         console.error("Error creating Midtrans transaction:", error)
//         throw error
//     }
// }

// function generateUUID() { // Public Domain/MIT
//     var d = new Date().getTime()//Timestamp
//     var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0//Time in microseconds since page-load or 0 if unsupported
//     return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
//         var r = Math.random() * 16//random number between 0 and 16
//         if(d > 0){//Use timestamp until depleted
//             r = (d + r)%16 | 0
//             d = Math.floor(d/16)
//         } else {//Use microseconds since page-load if supported
//             r = (d2 + r)%16 | 0
//             d2 = Math.floor(d2/16)
//         }
//         return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
//     })
// }