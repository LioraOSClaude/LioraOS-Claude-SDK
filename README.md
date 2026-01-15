<img width="1536" height="1024" alt="ChatGPT Image 15 Jan 2026, 20 45 22" src="https://github.com/user-attachments/assets/59670849-6ff0-4433-8f97-b46f3cbdd519" />


LioraOS Documentation
Welcome to the official documentation for LioraOS Claude — a privacy-native finance layer built on Solana. This documentation provides comprehensive guidance on how to use, integrate, and understand the platform's architecture and capabilities.

LioraOS is designed to let users transact, swap, invest, and manage portfolios without exposing their wallets, strategies, or transaction history to the public blockchain. It positions itself as a high-speed, non-custodial privacy layer where users still own their wallets, but all financial actions flow through an encrypted "shadow balance" that hides activity details from on-chain observers.

01
Non-Custodial
You always control your keys
02
High-Speed
Built on Solana for instant finality
03
Privacy-Native
Encrypted shadow balances
02 // GETTING_STARTED
Getting Started
Getting started with LioraOS is designed to be as simple and frictionless as possible. The platform aims to feel as simple as sending a message, without needing dozens of burner wallets or complex privacy setups.

[01]
Connect Your Wallet
Begin by connecting your existing Solana wallet to LioraOS. We support all major wallet providers including Phantom, Solflare, Backpack, and Ledger hardware wallets. Your wallet remains under your complete control at all times — LioraOS never takes custody of your assets.

Supported: Phantom, Solflare, Backpack, Ledger, Torus
[02]
Generate Private Profile
Once connected, LioraOS generates a private profile with a separate cryptographic identity. This identity is mathematically linked to your wallet but provides a privacy layer that allows you to perform financial actions without revealing your public wallet address.

Uses: zk-SNARKs, Elliptic Curve Cryptography, Deterministic Key Derivation
[03]
Fund Your Shadow Balance
Transfer SOL or any SPL tokens into your private shadow balance. On the public blockchain, only a deposit transaction to the LioraOS vault is visible. Your internal balance and all subsequent actions remain completely hidden from external observers.

Minimum deposit: 0.01 SOL | Supports: All SPL Tokens
[04]
Start Trading Privately
You're now ready to execute private financial actions. Swap tokens, enter positions, manage yield strategies, or make discreet payments — all while maintaining complete privacy from on-chain analysts, front-runners, and surveillance tools.

Available: Swaps, Trading, Yield, Payments, Portfolio Management
03 // ARCHITECTURE
System Architecture
LioraOS employs a multi-layered architecture designed to provide maximum privacy while maintaining the speed and security guarantees of the Solana blockchain.

// ARCHITECTURE_LAYERS
Layer 1: Solana Base Layer
The foundational blockchain providing consensus, finality, and settlement guarantees. All deposits and withdrawals are settled on Solana L1.

Layer 2: Privacy Execution Runtime
An off-chain execution environment where private transactions are processed, batched, and prepared for settlement without revealing individual actions.

Layer 3: Vault Contract System
Smart contracts managing the shadow vault pools, handling deposits, withdrawals, and generating cryptographic proofs for selective disclosure.

Layer 4: User Interface Layer
The client application providing seamless interaction with the privacy layer, including wallet connection, balance management, and action execution.

// DATA_FLOW
→
User initiates action via UI
→
Request encrypted & sent to runtime
→
Actions batched with other users
→
Settlement posted to Solana
// PRIVACY_GUARANTEES
✓
Transaction amounts hidden
✓
Sender/receiver unlinkable
✓
Timing analysis resistant
✓
Strategy patterns obscured
04 // SHADOW_BALANCE
Shadow Balance System
The Shadow Balance is the core innovation of LioraOS — an encrypted, off-chain representation of your assets that enables private financial operations while maintaining cryptographic guarantees of ownership and solvency.

What is a Shadow Balance?
A Shadow Balance is a private, encrypted representation of your deposited assets within the LioraOS privacy layer. Unlike traditional blockchain balances that are publicly visible, your shadow balance exists in an encrypted state that can only be decrypted by you (the owner) or through selective disclosure proofs you choose to generate.

When you deposit assets into LioraOS, the on-chain record shows only that a deposit was made to the vault — the amount, your identity, and your subsequent balance are all encrypted. This creates a "shadow" of your financial activity that is invisible to blockchain observers but fully verifiable through cryptographic proofs when needed.

Technical Implementation
// ENCRYPTION
Shadow balances use homomorphic encryption allowing computations on encrypted values without decryption. This enables balance updates without revealing amounts.

// COMMITMENT
Each balance update creates a Pedersen commitment — a cryptographic binding that proves the balance exists without revealing its value.

Shadow Balance Operations
DEPOSIT
Transfer assets from your wallet into the shadow balance. Creates an encrypted balance entry.

TRANSFER
Move assets between shadow balances. Sender and receiver remain unlinkable.

SWAP
Exchange one token for another within the privacy layer. Trade execution is hidden.

WITHDRAW
Return assets to any Solana wallet. Exit point can differ from entry point.

05 // PRIVATE_VAULT
Private Vault Architecture
The Private Vault is the on-chain smart contract system that holds pooled assets and manages the cryptographic state necessary for privacy operations.

Vault Structure
The vault operates as a pooled liquidity system. When users deposit assets, they are combined with other users' deposits in the vault pool. This pooling is fundamental to privacy — by mixing assets from multiple users, it becomes impossible to trace which specific tokens belong to which user.

Merkle Tree State
The vault maintains a Merkle tree of all balance commitments. Each leaf in the tree represents an encrypted balance. When you perform an action, the tree is updated with a new commitment while nullifying the old one. This allows verification that your balance exists without revealing which leaf is yours.

// DEPOSIT_PROCESS
1. User sends tokens to vault
2. Vault generates commitment
3. Commitment added to Merkle tree
4. Shadow balance created/updated
// WITHDRAWAL_PROCESS
1. User generates ZK proof
2. Proof verifies balance ownership
3. Nullifier prevents double-spend
4. Vault releases tokens
// VAULT_SECURITY_FEATURES
Multi-sig Admin
Protocol upgrades require 4/7 signatures
Time-locked Changes
48-hour delay on all parameter changes
Emergency Pause
Circuit breaker for critical issues
06 // PRIVATE_ACTIONS
Private Financial Actions
From your private vault, you can perform a wide range of financial actions. All actions are batched and executed so that public observers cannot trace which wallet performed which action, or the size and timing of positions.

[SWAP]
Private Token Swaps
Execute token swaps without revealing your trading activity. LioraOS routes swaps through integrated DEX venues (Jupiter, Raydium, Orca) but aggregates them with other users' swaps. External observers see only aggregate flow — your individual swap amount, direction, and timing are hidden.

Benefits:
• No front-running exposure
• MEV protection
• Strategy concealment
Supported DEXs:
• Jupiter Aggregator
• Raydium AMM/CLMM
• Orca Whirlpools
[YIELD]
Private Yield Strategies
Deposit into yield-generating protocols while keeping your positions private. LioraOS manages liquidity provision, lending, and staking through the privacy layer. Compound your returns without revealing your yield farming strategies to competitors or analysts.

Yield Sources:
• LP positions
• Lending protocols
• Liquid staking
Privacy Features:
• Position sizes hidden
• Entry/exit timing obscured
• APY strategies private
[TRADE]
Private Trading
Execute trading strategies without exposing your positions, entries, or exits. Whether you're accumulating a position, dollar-cost averaging, or executing a complex multi-leg strategy, your trading activity remains invisible to on-chain snipers and copy traders.

Protected From:
• Wallet tracking• Copy trading bots• On-chain analysts• Position snipers
[PAYMENT]
Discreet Payments
Send payments to any Solana address without creating a direct link between your wallet and the recipient. Perfect for private payroll, confidential business transactions, or any situation where payment privacy is essential.

Use Cases:
• Private payroll• Confidential deals• Anonymous donations• Business payments
07 // SELECTIVE_DISCLOSURE
Selective Disclosure
Privacy doesn't mean secrecy in all contexts. LioraOS provides powerful selective disclosure tools that let you prove specific facts about your financial activity without revealing everything. This enables transparency-on-demand, not full exposure.

Why Selective Disclosure?
There are legitimate reasons you might need to prove your financial activity: tax reporting, regulatory compliance, investor reporting, or establishing creditworthiness. Selective disclosure allows you to generate cryptographic proofs that verify specific claims while keeping everything else private.

Available Proof Types
Balance Proof
Prove you hold at least X amount without revealing exact balance

Transaction Proof
Prove a specific transaction occurred without revealing others

Range Proof
Prove activity within a date range for reporting periods

Aggregate Proof
Prove total volume/gains without revealing individual trades

// DISCLOSURE_WORKFLOW
01.
Select what information to disclose
02.
Generate cryptographic proof
03.
Share proof with verifier (auditor, partner, regulator)
04.
Verifier confirms proof validity without seeing hidden data
08 // SECURITY_MODEL
Security Model
Security is foundational to LioraOS. The platform employs multiple layers of cryptographic security, operational security, and economic security to protect user assets and privacy.

Cryptographic Security
// ENCRYPTION
• AES-256-GCM for data encryption
• Curve25519 for key exchange
• Ed25519 for signatures
// ZERO_KNOWLEDGE
• Groth16 proof system
• Bulletproofs for range proofs
• Trusted setup via MPC ceremony
Operational Security
LioraOS operates with a defense-in-depth approach. The privacy runtime is isolated from the settlement layer. Smart contracts are upgradeable only through time-locked, multi-sig governance. All critical operations require multiple independent confirmations.

Audits
Multiple third-party security audits (ongoing)
Bug Bounty
Up to $100K for critical vulnerabilities
Monitoring
24/7 anomaly detection and alerting
Risk Considerations
LioraOS is experimental infrastructure. While we employ best practices in cryptography and security, users should understand the risks:

⚠
Smart contract risk: Despite audits, vulnerabilities may exist
⚠
Early stage: Protocol is new and untested at scale
⚠
Regulatory uncertainty: Privacy protocols face evolving regulations
⚠
Cryptographic assumptions: Security relies on computational hardness assumptions
09 // API_REFERENCE
API Reference
LioraOS provides a comprehensive SDK and API for developers building privacy-enabled applications on Solana.

// INSTALLATION
npm install @lioraos/sdk

# or with yarn
yarn add @lioraos/sdk
// BASIC_USAGE
import { LioraOS } from '@lioraos/sdk';
import { Connection, PublicKey } from '@solana/web3.js';

// Initialize the client
const liora = new LioraOS({
  connection: new Connection('https://api.mainnet-beta.solana.com'),
  wallet: yourWalletAdapter,
});

// Generate private profile
const profile = await liora.createPrivateProfile();

// Deposit into shadow balance
const deposit = await liora.deposit({
  amount: 1.5, // SOL
  token: 'SOL',
});

// Execute private swap
const swap = await liora.privateSwap({
  fromToken: 'SOL',
  toToken: 'USDC',
  amount: 1.0,
  slippage: 0.5,
});

// Generate selective disclosure proof
const proof = await liora.generateProof({
  type: 'balance',
  minAmount: 100, // Prove balance >= 100 USDC
});
// CORE_METHODS
createPrivateProfile()
deposit()
withdraw()
privateSwap()
privateTransfer()
getBalance()
// PROOF_METHODS
generateProof()
verifyProof()
exportReport()
createAuditPackage()
revokeDisclosure()
10 // FAQ
Frequently Asked Questions
Is LioraOS fully decentralized?
LioraOS operates with a hybrid architecture. The settlement layer (deposits, withdrawals) is fully on-chain and decentralized on Solana. The privacy execution runtime currently relies on a semi-centralized relayer network, with plans to fully decentralize in Phase 3 of the roadmap.

Can I lose my funds?
As with any DeFi protocol, there are risks including smart contract bugs, cryptographic vulnerabilities, and operational failures. LioraOS is non-custodial — you always retain the cryptographic keys needed to prove ownership and withdraw funds. However, the protocol is experimental and should be treated as high-risk.

Is this legal?
Financial privacy is legal in most jurisdictions. LioraOS is designed for legitimate privacy needs: protecting trading strategies, maintaining business confidentiality, and personal financial privacy. The selective disclosure feature ensures you can comply with reporting requirements when needed. Always consult local regulations.

How is this different from a mixer?
Unlike simple mixers that only break transaction links, LioraOS is a full privacy layer that enables ongoing private financial operations — swaps, trading, yield farming, payments — all while maintaining the ability to selectively prove specific activities. It's infrastructure for private DeFi, not just a mixing service.

What tokens are supported?
Currently, LioraOS supports SOL and major SPL tokens including USDC, USDT, and top Solana ecosystem tokens. Support for additional tokens is added based on liquidity and demand. The private swap feature can access any token available through integrated DEX venues.

What are the fees?
LioraOS charges: 0.1% on deposits, 0.1% on withdrawals, 0.05% on private swaps (plus underlying DEX fees), and no fee for internal transfers. These fees support protocol development and the relayer network. Fee reductions are planned as the protocol scales.

How fast are transactions?
Private actions are batched in windows of approximately 30 seconds to maximize privacy through aggregation. Deposits and withdrawals settle on Solana in ~400ms. For time-sensitive trades, priority batching is available with slightly reduced privacy guarantees.

