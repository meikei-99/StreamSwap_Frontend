# StreamSwap @Polygon Mumbai testnet

StreamSwap is a 2-in-1 Dapp that helps you stream tokens in real-time and allows the receiver to dollar-cost average into crypto assets.
<br/><br/>
The MATICx tokens have powerful streaming functionality that can be streamed by a sender to a receiver on a monthly basis.
<br/><br/>
Sender wraps MATIC token into MATICx token, specifies monthly flow rate of MATICx (i.e. 0.1 MATICx/month) and the receiver receive MATICx every second (i.e. 0.00000003858 MATICx/second ≈ 0.003 MATICx/day) for a period of one month.
<br/>

## **How can the receiver make use of the MATICx token received every second??**

StreamSwap allows receiver perform swap between MATICx token and fDAI (fake dai) token, or vice versa, through dollar-cost averaging.
<br/><br/>
Receiver specifies the swap amount (i.e. 0.001 MATICx/day) and duration (i.e. 3). The contract will automate the swap process whereby 0.001 MATICx will be swapped into fDAI for a consecutive of 3 days.

## **Functionality**

-   wrap: convert MATIC token into MATICx token
-   unwrap: convert MATICx token into MATIC token
-   send: create a stream between two accounts (a sender and a receiver).
-   update: update an existing stream's rate between a sender and a receiver
-   delete: delete a stream between two accounts
-   switch: specify the swap from MATICx to fDAI, or vice versa
-   enter: enter the swap stage (**_user must first enter the swap before swapping can be performed_**)
-   swap: perform swap between MATICx and fDAI (**_kindly input swap amount of less than 1 MATICx/fDAI at the current stage_**)
-   withdraw: withdraw fDAI to the user's Metamask account

## **What I learnt**

-   how to build Dapp with different protocols (Uniswap and Superfluid)
-   how to automate smart contract's function using Chainlink Automation

## **Language/Framework used**

-   Solidity
-   Next.js
-   ether.js
-   Javascript
-   Tailwind

## **What if you encountered the following page loading error?**

```
ipfs resolve -r /ipfs/bafybeifocupu3e5ts4dosecxmsqbrwtkbjcenvmkkvz7dvou5vlk6jr5o4/Stream: no link named "Stream" under bafybeifocupu3e5ts4dosecxmsqbrwtkbjcenvmkkvz7dvou5vlk6jr5o4
```

For example, you are now on the Stream page and wish to reload the page. You might encounter the error as stated above. When you try to press the reload button, the same error appear. <br/><br/>
How to solve this problem??<br/><br/>
You should now have this address `streamswap.on.fleek.co/Stream` on your browser's address bar. Remove `/Stream` from the address bar and reload the page. The problem might be resolved.

### **Disclaimer**

The dapp is still in development mode and future improvement is needed.
Thank you.

@Contract address: 0x069a3374b3e788f8563206A432a9Af4963c96Eb2
