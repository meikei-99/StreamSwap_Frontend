# StreamSwap
StreamSwap is a 2-in-1 Dapp that helps you stream tokens in real-time and allows the receiver to dollar-cost average into crypto assets.
<br/><br/>
The MATICx tokens have powerful streaming functionality that can be streamed by a sender to a receiver on a monthly basis. 
<br/><br/>
Sender wraps MATIC token into MATICx token, specifies monthly flow rate of MATICx (i.e. 0.1 MATICx/month) and the receiver receive MATICx every second (i.e. 0.00000003858 MATICx/second ≈ 0.003 MATICx/day) for a period of one month.
<br/>
### **How can the receiver make use of the MATICx token received every second??**
StreamSwap allows receiver perform swap between MATICx token and fDAI (fake dai) token, or vice versa, through dollar-cost averaging.
<br/><br/>
Receiver specifies the swap amount (i.e. 0.001 MATICx/day) and duration (i.e. 3). The contract will automate the swap process whereby 0.001 MATICx will be swapped into fDAI for a consecutive of 3 days. 

### **Functionality**
- wrap: convert MATIC token into MATICx token 
- unwrap: convert MATICx token into MATIC token
- send: create a stream between two accounts (a sender and a receiver). 
- update: update an existing stream's rate between a sender and a receiver
- delete: delete a stream between two accounts 
- switch: specify the swap from MATICx to fDAI, or vice versa
- enter: enter the swap stage (***user must first enter the swap before swapping can be performed***)
- swap: perform swap between MATICx and fDAI
- withdraw: withdraw fDAI to the user's Metamask account

### **What I learnt**
- how to build Dapp with different protocols (Uniswap and Superfluid)
- how to automate smart contract's function using Chainlink Automation

#### **Disclaimer**
The dapp is still in development mode and future improvement is needed. 
Thank you. 


