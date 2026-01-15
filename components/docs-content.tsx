"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowLeft,
  BookOpen,
  ChevronRight,
  Search,
  Copy,
  Check,
  ImageIcon,
  MessageCircle,
  Crosshair,
  Wallet,
  RefreshCw,
  Users,
  Shield,
  Rocket,
  Bot,
  Radio,
} from "lucide-react"

// Animated code lines for decoration
const CODE_LINES = [
  "const aivon = new AivonAI({ model: 'claude-3.5' });",
  "await aivon.chat.send({ message: prompt });",
  "const image = await fal.generate({ prompt, style });",
  "solana.connect({ cluster: 'mainnet-beta' });",
  "const wallet = await phantom.connect();",
  "aivon.sniper.watch({ token: CA, slippage: 0.5 });",
  "const price = await jupiter.getQuote(tokenA, tokenB);",
  "tracker.monitor({ twitter: '@target', alerts: true });",
  "arbitrage.scan({ pairs: ['SOL/USDC'], threshold: 0.3 });",
  "copy.follow({ wallet: address, percentage: 50 });",
]

const sections = [
  {
    id: "introduction",
    title: "Introduction",
    icon: BookOpen,
    content: [
      {
        title: "What is Aivon AI?",
        body: `Aivon AI is a next-generation artificial intelligence platform built for the Solana ecosystem. At its core, Aivon leverages Claude — Anthropic's most advanced AI model — to deliver intelligent, thoughtful, and genuinely helpful interactions.

But Aivon is more than just a chatbot. It's a comprehensive suite of AI-powered tools designed specifically for crypto traders, creators, and builders. We combine conversational AI with practical trading utilities, creating a platform where intelligence meets execution.

The name "Aivon" represents the fusion of AI and innovation. We're not here to replicate existing tools — we're here to reimagine what's possible when cutting-edge AI meets the speed and efficiency of Solana.

Powered by Claude's constitutional AI approach, Aivon is designed to be helpful, harmless, and honest. Every response, every suggestion, every analysis comes from a place of genuine utility rather than hype or manipulation.`,
      },
      {
        title: "The Claude Advantage",
        body: `At the heart of Aivon lies Claude, Anthropic's flagship AI model. But why Claude specifically?

CONSTITUTIONAL AI
Claude is built with constitutional AI principles — a methodology that makes the model genuinely helpful while avoiding harmful outputs. This isn't just safety theater; it's a fundamental architectural choice that makes Claude more reliable and trustworthy.

EXTENDED CONTEXT
Claude can process and remember significantly more context than most AI models. This means deeper conversations, better understanding of your specific situation, and more nuanced responses.

HONEST UNCERTAINTY
Unlike AI models that confidently make things up, Claude acknowledges when it doesn't know something. In crypto, where bad information can cost money, this honesty is invaluable.

NUANCED REASONING
Claude excels at understanding context, subtext, and nuance. It can parse complex trading scenarios, understand market dynamics, and provide analysis that actually makes sense.

CREATIVE CAPABILITY
Beyond analysis, Claude brings genuine creativity. Whether you're brainstorming token concepts, writing community content, or designing marketing strategies, Claude is a capable creative partner.`,
      },
      {
        title: "Platform Overview",
        body: `Aivon AI consists of six core utilities, each designed to serve a specific need in the Solana trading ecosystem:

1. CLAUDE CHAT
Your intelligent AI companion. Ask questions, brainstorm ideas, analyze markets, or just have a conversation. Claude understands crypto, Solana, and the unique culture of on-chain trading.

2. AI IMAGE GENERATOR
Create stunning visuals using Fal AI's advanced image generation. Perfect for token artwork, meme creation, community content, and marketing materials.

3. TOKEN SNIPER [COMING SOON]
Automated token sniping with intelligent entry detection. Set parameters, configure slippage, and let Aivon execute at optimal moments.

4. X TRACKER [COMING SOON]
Monitor Twitter/X accounts in real-time. Track influencers, detect alpha, and receive instant alerts when target accounts post about specific topics.

5. WALLET ANALYTICS [COMING SOON]
Deep-dive into any Solana wallet. Track holdings, analyze trading patterns, identify winning strategies, and learn from successful traders.

6. ARB SCANNER [COMING SOON]
Real-time arbitrage opportunity detection across Solana DEXs. Identify price discrepancies and execute profitable trades before they disappear.

7. COPY TRADER [COMING SOON]
Automatically mirror trades from successful wallets. Set parameters, manage risk, and leverage the expertise of proven traders.`,
      },
      {
        title: "Why Solana?",
        body: `Building on Solana wasn't arbitrary — it was strategic:

SPEED
Solana processes 65,000+ transactions per second with 400ms block times. For trading tools, this speed is essential. Sniping, arbitrage, and copy trading all depend on execution speed.

COST EFFICIENCY
Transactions cost fractions of a cent. This makes high-frequency strategies viable and keeps the platform accessible to everyone, not just whales.

ECOSYSTEM MATURITY
Solana has the infrastructure we need: robust DEXs, reliable oracles, established wallets, and a thriving DeFi ecosystem. We're building on solid ground.

COMMUNITY CULTURE
Solana's community is experimental, creative, and willing to try new things. This is the perfect environment for an AI-native platform like Aivon.

TECHNICAL COMPATIBILITY
Solana's architecture aligns well with AI workloads. Fast finality means real-time AI analysis can translate to immediate action.

We're not chain-agnostic by choice. We believe in Solana's future, and we're building Aivon to be a native part of that ecosystem.`,
      },
    ],
  },
  {
    id: "claude-chat",
    title: "Claude Chat",
    icon: MessageCircle,
    content: [
      {
        title: "Understanding Claude Chat",
        body: `Claude Chat is your direct interface to Anthropic's Claude AI, customized for the crypto and Solana context. This isn't a generic chatbot with crypto keywords added — it's a thoughtfully configured AI companion that understands the unique needs of traders and builders.

WHAT CLAUDE KNOWS:
- Solana ecosystem fundamentals
- DeFi protocols and mechanics
- Trading strategies and risk management
- Token economics and tokenomics
- Community building and marketing
- Technical analysis concepts
- On-chain data interpretation

HOW CLAUDE THINKS:
Claude doesn't just pattern-match keywords. It genuinely reasons about your questions, considers context, and provides thoughtful responses. It will push back on bad ideas, acknowledge uncertainty, and admit when something is outside its expertise.

CLAUDE'S LIMITATIONS:
- No real-time market data access
- Cannot execute transactions
- Knowledge cutoff exists
- Cannot browse the internet live
- Not financial advice

Understanding these limitations helps you use Claude effectively. It's an analytical and creative partner, not an oracle or trading bot.`,
      },
      {
        title: "Effective Prompting",
        body: `Get better results from Claude with these prompting strategies:

BE SPECIFIC
Instead of: "Tell me about Solana"
Try: "Explain how Solana's proof-of-history consensus mechanism improves transaction throughput compared to traditional proof-of-stake"

PROVIDE CONTEXT
Instead of: "Should I buy this token?"
Try: "I'm looking at a new memecoin that launched 2 hours ago. It has 500 holders, $200k liquidity, and the dev wallet holds 5%. What red flags should I look for?"

ASK FOR REASONING
Instead of: "Is this a good idea?"
Try: "Walk me through the pros and cons of providing liquidity to a new pool in the first 24 hours"

REQUEST FORMATS
"Give me a bullet-point list of..."
"Explain this like I'm new to crypto..."
"What are the three most important factors..."

ITERATE AND REFINE
Claude remembers your conversation. Build on previous responses:
"That's helpful. Now let's dive deeper into the second point..."
"What about edge cases where that wouldn't apply?"

CHALLENGE CLAUDE
"What am I missing here?"
"What would a critic say about this strategy?"
"What's the worst-case scenario?"`,
      },
      {
        title: "Use Cases",
        body: `Here's how traders use Claude Chat effectively:

MARKET ANALYSIS
"Analyze the current state of Solana memecoins. What patterns are you seeing in successful launches this month?"

STRATEGY DEVELOPMENT
"I want to build a strategy for identifying early-stage tokens with potential. Help me create a checklist."

TOKENOMICS REVIEW
"Here's a tokenomics structure: [details]. What are the potential issues with this distribution?"

CONTENT CREATION
"Write a Twitter thread explaining why [concept] matters for Solana traders."

CODE REVIEW
"Review this Solana program snippet for potential issues: [code]"

RISK ASSESSMENT
"I'm considering this trade: [details]. Walk me through the risks I might not be seeing."

LEARNING
"Explain impermanent loss in a way that actually makes sense. Use a concrete example."

BRAINSTORMING
"I'm building a new DeFi protocol. Help me think through unique value propositions."

Claude excels at being a thinking partner. The more you treat it like a knowledgeable colleague rather than a search engine, the better your results.`,
      },
      {
        title: "Chat Best Practices",
        body: `CONVERSATION MANAGEMENT
- Start new conversations for new topics
- Reference earlier points in the same conversation
- If Claude goes off-track, explicitly redirect

GETTING UNSTUCK
- Rephrase questions differently
- Break complex questions into parts
- Ask Claude to explain its reasoning

VERIFICATION
- Cross-reference important information
- Ask for sources when applicable
- Use Claude's analysis as a starting point, not final answer

CREATIVE USE
- Brainstorm token names and concepts
- Draft community announcements
- Develop narrative and storytelling
- Create educational content

TECHNICAL USE
- Explain complex concepts simply
- Debug thinking about strategies
- Analyze hypothetical scenarios
- Model different outcomes

WHAT NOT TO DO
- Don't ask for specific price predictions
- Don't treat responses as financial advice
- Don't share private keys or sensitive data
- Don't expect real-time market awareness

Claude is a powerful tool, but it's still a tool. Use it to augment your thinking, not replace it.`,
      },
    ],
  },
  {
    id: "image-generator",
    title: "AI Image Generator",
    icon: ImageIcon,
    content: [
      {
        title: "How It Works",
        body: `The Aivon AI Image Generator uses Fal AI's advanced image generation models to create high-quality visuals from text descriptions.

TECHNOLOGY STACK:
- Fal AI's Flux Schnell model
- Optimized for speed and quality
- High-resolution output (1024x1024)
- Multiple style presets

GENERATION PROCESS:
1. You write a descriptive prompt
2. Select a style preset (optional)
3. Your prompt is processed by the AI
4. Image is generated in 10-30 seconds
5. Download your unique creation

WHAT MAKES IT SPECIAL:
Unlike generic image generators, ours is configured for crypto and trading aesthetics. The style presets are designed for token art, meme creation, and community content — not generic stock photos.

OUTPUT OWNERSHIP:
Images you generate are yours to use. Profile pictures, token logos, marketing materials, memes — whatever you need. We don't retain ownership of your creations.`,
      },
      {
        title: "Writing Effective Prompts",
        body: `The prompt is everything. Here's how to write prompts that generate great images:

STRUCTURE
[Subject] + [Style/Aesthetic] + [Details] + [Mood/Atmosphere]

EXAMPLE PROMPTS:

For Token Art:
"A glowing crystal orb containing swirling purple and blue energy, floating in dark space, ethereal and mystical, digital art style, high detail"

For Memes:
"A cartoon frog wearing a trading suit, looking at multiple computer screens showing charts, neon green lighting, cyberpunk style"

For Community Content:
"Futuristic cityscape with Solana logo integrated into buildings, night scene with purple and teal neon lights, cinematic composition"

TIPS:
- Be specific about colors you want
- Mention art style (digital art, anime, realistic, etc.)
- Describe lighting and atmosphere
- Include composition hints (close-up, wide shot, etc.)
- Reference existing styles if helpful

WHAT TO AVOID:
- Vague single-word prompts
- Copyrighted character names
- Overly complex multi-scene descriptions
- Text in images (AI struggles with this)`,
      },
      {
        title: "Style Presets",
        body: `Choose a style to influence the overall aesthetic:

DEFAULT
Clean, balanced generation that follows your prompt closely without strong stylistic bias. Best for: General purpose, when you want prompt control.

ANIME
Japanese animation aesthetic with characteristic features — expressive eyes, dynamic compositions, vibrant colors. Best for: Character art, mascots, waifu-style content.

REALISTIC
Photorealistic rendering with natural lighting and textures. Best for: Professional imagery, product mockups, serious branding.

CYBERPUNK
Neon-drenched, high-tech, dystopian aesthetic. Heavy on purples, pinks, and blues with technological elements. Best for: Crypto native content, trading vibes, tech themes.

FANTASY
Magical, ethereal aesthetic with mystical elements. Rich colors, glowing effects, otherworldly atmosphere. Best for: Token mythology, epic narratives, mystical branding.

MINIMALIST
Clean, simple, focused compositions. Limited color palette, lots of negative space, modern feel. Best for: Clean branding, professional content, subtle aesthetics.

Each style can be combined with any prompt. Experiment to find what works for your specific needs.`,
      },
      {
        title: "Usage Guidelines",
        body: `DOWNLOADING
Click the download button after generation. Images are saved as high-resolution PNG files.

REGENERATION
Not happy with the result? Generate again. Even identical prompts produce different outputs — that's the nature of AI generation.

STORAGE
We don't permanently store your generated images. Download what you want to keep. Leaving the page without downloading means the image is gone.

ACCEPTABLE USE:
- Personal projects
- Token branding and logos
- Community content and memes
- Social media posts
- Marketing materials
- NFT creation (check terms)

NOT ACCEPTABLE:
- Impersonation or fraud
- Harmful or illegal content
- Claiming AI art as hand-drawn
- Copyright infringement attempts

PRACTICAL TIPS:
- Generate multiple versions
- Iterate on prompts based on results
- Save prompts that work well
- Combine with other editing tools for final polish
- Consider your use case when choosing style`,
      },
    ],
  },
  {
    id: "token-sniper",
    title: "Token Sniper",
    icon: Crosshair,
    content: [
      {
        title: "What is Token Sniping?",
        body: `Token sniping is the practice of buying a token immediately upon launch or listing, typically within the first few blocks or seconds. The goal is to secure an early position before price discovery pushes the value higher.

WHY SNIPE?
- First-mover advantage in price
- Access to initial liquidity pricing
- Position before wider market awareness
- Potential for significant upside on successful launches

THE CHALLENGE:
Manual sniping is nearly impossible. By the time you see a launch, connect your wallet, and execute a trade, the opportunity may be gone. Bots and automated tools dominate this space.

AIVON'S APPROACH:
Our Token Sniper is designed to level the playing field. Intelligent automation, customizable parameters, and AI-assisted analysis help you compete in a space traditionally dominated by sophisticated operators.

STATUS: COMING SOON
The Token Sniper is currently in development. Follow our official channels for launch announcements.`,
      },
      {
        title: "Planned Features",
        body: `AUTOMATED EXECUTION
Configure your parameters once, and the sniper watches for opportunities. When conditions are met, it executes automatically — faster than any human could.

INTELLIGENT FILTERING
Not every new token is worth sniping. Our AI analyzes:
- Contract code patterns
- Deployer wallet history
- Initial liquidity structure
- Tokenomics red flags
- Historical similar launches

CUSTOMIZABLE PARAMETERS
- Max buy amount
- Slippage tolerance
- Gas priority settings
- Contract requirements
- Minimum liquidity thresholds

RISK MANAGEMENT
Built-in protections:
- Automatic sell triggers
- Position size limits
- Blacklist filtering
- Honeypot detection
- Rug pull indicators

REAL-TIME MONITORING
Track your snipes, see execution details, monitor positions, and receive alerts — all from a unified dashboard.`,
      },
      {
        title: "Risk Disclosure",
        body: `Token sniping carries significant risk. We want you to understand this clearly:

FINANCIAL RISK
- Most new tokens fail
- Rug pulls are common
- Liquidity can disappear instantly
- You can lose 100% of sniped positions

TECHNICAL RISK
- Failed transactions still cost gas
- Slippage can result in worse prices
- Front-running by other bots
- Smart contract vulnerabilities

MARKET RISK
- Pump and dump schemes
- Coordinated manipulation
- Fake volume and activity
- Misleading social signals

OUR POSITION:
Aivon provides tools, not guarantees. We build in safety features and warnings, but ultimate responsibility lies with you. Never snipe with money you can't afford to lose.

RECOMMENDED PRACTICES:
- Start with small amounts
- Diversify across multiple opportunities
- Set strict loss limits
- Research beyond automation
- Understand the tokens you're buying`,
      },
      {
        title: "Getting Ready",
        body: `Prepare for Token Sniper launch:

WALLET SETUP
- Ensure your wallet has SOL for transactions
- Keep snipe funds separate from main holdings
- Familiarize yourself with quick transaction signing

KNOWLEDGE PREPARATION
- Understand how Solana token launches work
- Learn about common rug pull tactics
- Study successful vs failed launches
- Know the pump.fun and Raydium ecosystems

MINDSET
- Expect losses — they're part of the game
- Don't chase every opportunity
- Quality over quantity
- Patience and discipline win long-term

FOLLOW UPDATES
- Join our official channels
- Watch for beta announcements
- Participate in testing when available
- Provide feedback to improve the tool

When Token Sniper launches, prepared users will have the best experience. Use this time to learn.`,
      },
    ],
  },
  {
    id: "x-tracker",
    title: "X Tracker",
    icon: Radio,
    content: [
      {
        title: "Why Track X/Twitter?",
        body: `In crypto, information spreads on Twitter/X faster than anywhere else. Alpha often starts as a tweet. Influencer posts move markets. Announcements happen in real-time.

THE PROBLEM:
You can't watch everyone all the time. Key tweets get buried in noise. By the time you see important information, the market has already reacted.

THE SOLUTION:
X Tracker monitors accounts you care about and alerts you to relevant activity. It's like having a research assistant who never sleeps, constantly watching for signals.

USE CASES:
- Track influencer accounts for alpha
- Monitor project accounts for announcements
- Watch whale wallets' associated accounts
- Follow alpha callers and analyze patterns
- Detect sentiment shifts in real-time

STATUS: COMING SOON
X Tracker is in development. Stay tuned for launch.`,
      },
      {
        title: "Planned Features",
        body: `ACCOUNT MONITORING
Track multiple accounts simultaneously. Get notified when they post about specific topics, tokens, or keywords.

KEYWORD ALERTS
Set up custom keyword triggers:
- Token symbols and contract addresses
- Project names and ecosystem terms
- Specific phrases or hashtags
- Combination logic (AND/OR/NOT)

SENTIMENT ANALYSIS
AI-powered analysis of tweet sentiment:
- Bullish/bearish classification
- Urgency detection
- Credibility scoring
- Historical accuracy tracking

INFLUENCER INSIGHTS
Track record analysis:
- Past calls and outcomes
- Average timing to market moves
- Accuracy statistics
- Influence reach metrics

ALERT DELIVERY
Multiple notification options:
- In-app notifications
- Browser push notifications
- Webhook integrations
- Custom alert sounds`,
      },
      {
        title: "Strategic Use",
        body: `FINDING ALPHA
The best traders find information before it's widely known. X Tracker helps by:
- Monitoring less-followed accounts that break news
- Detecting unusual activity from known wallets' accounts
- Identifying when multiple accounts discuss the same topic
- Alerting to deleted tweets (often contain alpha)

AVOIDING MANIPULATION
Not all signals are genuine:
- Track pump group coordination patterns
- Identify copy-paste shill campaigns
- Recognize paid promotion vs organic interest
- Analyze account authenticity

TIMING ENTRIES
Use X signals to time trades:
- Position before influencer posts
- Ride momentum on announcements
- Exit before sentiment shifts
- Avoid buying tops

RESEARCH ENHANCEMENT
Beyond trading signals:
- Collect data on project development
- Track team communication patterns
- Monitor competitor activity
- Understand community sentiment`,
      },
      {
        title: "Best Practices",
        body: `ACCOUNT SELECTION
Quality over quantity:
- Focus on accounts with track records
- Include both bulls and bears for balance
- Add project official accounts
- Track competitor/related projects

KEYWORD STRATEGY
Be specific:
- Use contract addresses not just names
- Include common misspellings
- Add relevant hashtags
- Update keywords as context changes

ALERT MANAGEMENT
Don't overwhelm yourself:
- Prioritize alert types
- Set quiet hours if needed
- Review and refine triggers
- Archive irrelevant alerts

VERIFICATION
Never trade on a single signal:
- Cross-reference multiple sources
- Verify with on-chain data
- Check for coordination
- Consider the source's incentives

Remember: X Tracker is a research tool, not a trading signal service. It surfaces information — you still need to analyze and decide.`,
      },
    ],
  },
  {
    id: "wallet-analytics",
    title: "Wallet Analytics",
    icon: Wallet,
    content: [
      {
        title: "The Power of On-Chain Data",
        body: `Every Solana transaction is public. Every trade, every transfer, every interaction is recorded on-chain forever. This transparency is a goldmine for those who know how to use it.

WHAT YOU CAN LEARN:
- What tokens successful traders hold
- When smart money enters positions
- How whales manage their portfolios
- Patterns in profitable trading behavior
- Early signals before market moves

THE CHALLENGE:
Raw blockchain data is incomprehensible to most people. Transactions are hashes and addresses. Making sense of it requires parsing, analysis, and visualization.

AIVON'S SOLUTION:
Wallet Analytics transforms raw on-chain data into actionable intelligence. Track any wallet, understand their strategy, and learn from the best.

STATUS: COMING SOON
Wallet Analytics is currently in development.`,
      },
      {
        title: "Planned Features",
        body: `WALLET TRACKING
Monitor any public Solana wallet:
- Current holdings and values
- Historical positions
- P&L calculations
- Activity timeline

TRADING PATTERN ANALYSIS
Understand how a wallet trades:
- Entry/exit timing patterns
- Average hold duration
- Win rate and risk/reward
- Token type preferences

PERFORMANCE METRICS
Quantify trading success:
- Total returns over time
- Realized vs unrealized P&L
- Best and worst trades
- Consistency metrics

ALERTS
Get notified of wallet activity:
- Large purchases or sales
- New token positions
- Unusual activity patterns
- Liquidity movements

COMPARISON TOOLS
Benchmark and compare:
- Your wallet vs tracked wallets
- Multiple wallet comparison
- Performance over time periods
- Strategy correlation analysis`,
      },
      {
        title: "Finding Wallets to Track",
        body: `Not all wallets are worth tracking. Here's how to find the good ones:

SUCCESS INDICATORS
Look for wallets with:
- Consistent profitability over time
- Early entries in successful tokens
- Reasonable position sizing
- Clear strategy patterns

WHERE TO FIND THEM
Sources for wallet discovery:
- On-chain leaderboards
- Token holder analyses
- Community-shared wallets
- Top trader competitions

RED FLAGS
Avoid wallets that:
- Only show winning trades (survivorship bias)
- Have insider access (unfair advantage)
- Use manipulation tactics
- Lack consistent methodology

CATEGORIZATION
Different wallet types serve different purposes:
- Sniper wallets: Study timing and execution
- Whale wallets: Understand big money flows
- Alpha wallets: Early trend identification
- Farming wallets: Yield strategy research

Build a diverse watchlist that provides different types of intelligence.`,
      },
      {
        title: "Ethical Considerations",
        body: `PRIVACY
While blockchain data is public, privacy matters:
- Don't dox wallet owners
- Respect pseudonymity
- Don't harass or target individuals
- Use data for learning, not stalking

RESPONSIBLE USE
Wallet analytics is for education and research:
- Learn strategies, don't blindly copy
- Understand context behind trades
- Recognize you're seeing incomplete pictures
- Accept that past performance isn't future guarantee

LIMITATIONS
What on-chain data doesn't show:
- The trader's thesis and reasoning
- Their overall financial situation
- Trades on other chains or CEXs
- Mistakes they learned from

MINDSET
Use wallet analytics as one tool among many:
- Combine with fundamental analysis
- Cross-reference with social signals
- Develop your own thesis
- Learn principles, not just trades

The goal is to become a better trader yourself, not to parasitically copy others forever.`,
      },
    ],
  },
  {
    id: "arb-scanner",
    title: "Arb Scanner",
    icon: RefreshCw,
    content: [
      {
        title: "Understanding Arbitrage",
        body: `Arbitrage is profiting from price differences of the same asset across different markets. In DeFi, this happens when the same token has different prices on different DEXs.

SIMPLE EXAMPLE:
- Token X is $1.00 on Jupiter
- Token X is $1.05 on Raydium
- Buy on Jupiter, sell on Raydium = $0.05 profit (minus fees)

WHY IT EXISTS:
- Markets aren't perfectly efficient
- Liquidity varies across DEXs
- Information spreads at different speeds
- Trading activity creates temporary imbalances

THE OPPORTUNITY:
Arbitrage opportunities are typically small and short-lived, but they're risk-free profit when executed correctly. The challenge is finding and executing them fast enough.

STATUS: COMING SOON
Arb Scanner is in development.`,
      },
      {
        title: "Planned Features",
        body: `REAL-TIME SCANNING
Continuous monitoring across major Solana DEXs:
- Jupiter
- Raydium
- Orca
- And others

OPPORTUNITY DETECTION
Identify profitable arbitrage:
- Cross-DEX price comparison
- Fee calculation included
- Slippage estimation
- Net profit display

EXECUTION PATHWAYS
Optimal routing for execution:
- Direct paths
- Multi-hop routes
- Flash loan integration
- Gas optimization

FILTERING CONTROLS
Customize what you see:
- Minimum profit threshold
- Specific token pairs
- Liquidity requirements
- Risk parameters

HISTORICAL DATA
Learn from past opportunities:
- Frequency patterns
- Average profit sizes
- Duration statistics
- Best performing pairs`,
      },
      {
        title: "Challenges and Realities",
        body: `Arbitrage sounds easy but has significant challenges:

COMPETITION
You're not alone:
- Professional arbitrage bots
- MEV extractors
- Well-funded operations
- Sophisticated algorithms

EXECUTION SPEED
Opportunities disappear fast:
- Milliseconds matter
- Network congestion impacts
- Priority fees necessary
- Latency is critical

CAPITAL REQUIREMENTS
Profitability often requires scale:
- Small profits on small amounts = minimal gains
- Gas fees eat into margins
- Flash loans can help but add complexity

RISK FACTORS
Not always risk-free:
- Failed transactions cost gas
- Slippage can eliminate profits
- Price changes during execution
- Smart contract risks

REALISTIC EXPECTATIONS
Arb Scanner helps you see opportunities, but:
- Not all opportunities are capturable
- Competitive landscape is tough
- Consistent profits require sophistication
- Learning curve exists`,
      },
      {
        title: "Getting Started with Arb",
        body: `Prepare for Arb Scanner launch:

EDUCATION
Understand the mechanics:
- How DEX pricing works
- What creates price discrepancies
- How arbitrage bots operate
- The role of liquidity

CAPITAL PREPARATION
Be ready with:
- SOL for gas fees
- Stablecoins for trading
- Understanding of position sizing
- Risk capital only

TECHNICAL SETUP
Optimize your setup:
- Fast internet connection
- Reliable wallet access
- Understanding of transaction signing
- Familiarity with DEX interfaces

MENTAL PREPARATION
Set expectations correctly:
- Start small and learn
- Expect failed attempts
- Celebrate small wins
- Iterate and improve

Arb Scanner is a tool for education and opportunity identification. Success depends on your execution and strategy.`,
      },
    ],
  },
  {
    id: "copy-trader",
    title: "Copy Trader",
    icon: Users,
    content: [
      {
        title: "What is Copy Trading?",
        body: `Copy trading automatically replicates trades from selected wallets into your own wallet. When a tracked wallet buys a token, your wallet buys too. When they sell, you sell.

THE APPEAL:
- Leverage others' research and expertise
- Trade while you sleep
- Learn by watching successful traders
- Diversify your trading exposure

HOW IT WORKS:
1. Select wallets to copy
2. Set your copy parameters
3. System monitors selected wallets
4. Trades are mirrored automatically
5. You maintain control and can override

Copy trading is popular in traditional finance and increasingly in DeFi. Aivon brings this capability to Solana.

STATUS: COMING SOON
Copy Trader is currently in development.`,
      },
      {
        title: "Planned Features",
        body: `WALLET SELECTION
Choose who to copy:
- Browse successful wallets
- Analyze historical performance
- View trading style metrics
- Set up multiple copy sources

COPY PARAMETERS
Control how trades are copied:
- Percentage of position to copy
- Maximum trade size limits
- Token blacklist/whitelist
- Timing delay options

RISK MANAGEMENT
Built-in protections:
- Maximum daily exposure limits
- Stop-loss automation
- Portfolio allocation caps
- Manual override always available

PERFORMANCE TRACKING
Monitor your copy trading:
- Real-time P&L display
- Comparison to source wallets
- Trade history and analysis
- Performance attribution

NOTIFICATIONS
Stay informed:
- New trade alerts
- Significant position changes
- Performance updates
- Risk warnings`,
      },
      {
        title: "Selecting Wallets to Copy",
        body: `Choosing the right wallets is crucial:

PERFORMANCE METRICS
Look for:
- Consistent returns over time (not just one lucky trade)
- Reasonable drawdowns
- Appropriate risk/reward ratios
- Verifiable on-chain history

TRADING STYLE
Consider compatibility:
- Holding period (matches your timeframe?)
- Position sizes (appropriate for your capital?)
- Token types (comfortable with their risk level?)
- Activity frequency (manageable for you?)

RED FLAGS
Avoid wallets that:
- Have sudden unexplained profits (possible insider)
- Trade illiquid tokens (can't replicate)
- Use strategies requiring size you don't have
- Show signs of manipulation

DIVERSIFICATION
Don't put all eggs in one basket:
- Copy multiple wallets
- Vary trading styles
- Balance aggressive and conservative
- Regularly review and adjust`,
      },
      {
        title: "Important Considerations",
        body: `EXECUTION DIFFERENCES
Your copy won't be identical:
- Timing delays exist
- Slippage varies by position size
- Gas fees affect different portfolios differently
- Liquidity availability changes

RESPONSIBILITY
You're still responsible:
- Understand why you're copying
- Monitor your positions
- Set appropriate risk parameters
- Don't blindly follow anyone

MARKET IMPACT
Copy trading at scale can:
- Move markets (especially illiquid tokens)
- Create self-fulfilling patterns
- Attract front-runners
- Reduce edge of original trader

SUSTAINABLE APPROACH:
- Use copy trading to learn, not just profit
- Study the trades, understand the logic
- Develop your own thesis over time
- Graduate to independent trading

Copy trading is a powerful tool but not a replacement for learning to trade yourself.`,
      },
    ],
  },
  {
    id: "security",
    title: "Security",
    icon: Shield,
    content: [
      {
        title: "Our Security Philosophy",
        body: `Security isn't a feature — it's a foundation. Everything we build at Aivon starts with security considerations.

PRINCIPLES:
- Never store sensitive data we don't need
- Never request permissions we don't require
- Always be transparent about what we access
- Continuously audit and improve

WHAT WE ACCESS:
- Your wallet's public address (publicly visible anyway)
- Read-only access to verify identity
- No access to private keys ever
- No ability to initiate transactions

WHAT WE NEVER DO:
- Ask for seed phrases or private keys
- Request transaction signing for authentication
- Store your wallet's private data
- Share your information with third parties

Our business model doesn't depend on selling your data or compromising your security.`,
      },
      {
        title: "Wallet Safety",
        body: `Your wallet is your bank account. Protect it accordingly:

SEED PHRASE RULES:
- Write it on paper, store physically secure
- Never enter it on any website
- Never share it with anyone, including "support"
- Consider splitting it across locations
- Never store digitally unencrypted

TRANSACTION SIGNING:
- Read every transaction before signing
- Verify addresses character by character
- Be suspicious of urgency or pressure
- When in doubt, don't sign

WALLET HYGIENE:
- Use separate wallets for different purposes
- Keep main holdings in cold storage
- Use hot wallet only for active trading
- Regularly review connected sites

HARDWARE WALLETS:
For significant holdings, consider:
- Ledger
- Trezor
- Grid+
These add physical security layers that software can't provide.`,
      },
      {
        title: "Recognizing Scams",
        body: `Scams are everywhere in crypto. Know the patterns:

COMMON SCAM TYPES:

Fake Support
"Support team" contacts you first offering help. Real support never DMs you unsolicited.

Phishing Sites
Lookalike sites that steal credentials. Always verify URLs character by character.

Too Good to Be True
"Send 1 SOL, get 2 back" or guaranteed returns. If it sounds too good, it's a scam.

Fake Airdrops
Requiring you to connect wallet or sign transactions. Real airdrops don't need special permissions.

Impersonation
Fake accounts pretending to be team members. Verify through official channels only.

PROTECTION TACTICS:
- Bookmark official sites, never use search results
- Enable 2FA where available
- Use unique passwords per site
- Be suspicious of urgency
- Verify through multiple channels
- Trust your instincts — if something feels wrong, stop`,
      },
      {
        title: "Reporting Issues",
        body: `If you encounter security issues:

FOUND A VULNERABILITY?
Contact us through official channels immediately. We take all reports seriously and will investigate promptly.

BEEN SCAMMED?
- Document everything (screenshots, addresses, transactions)
- Report to relevant platforms
- Warn the community (without spreading FUD)
- Learn from the experience

SUSPICIOUS ACTIVITY ON AIVON?
Report to our team through:
- Official Discord (verified channels only)
- Official Twitter/X
- Official Telegram
- Never through unsolicited DMs

OUR RESPONSE:
We commit to:
- Investigating all reports
- Responding within 48 hours
- Transparently communicating findings
- Implementing fixes quickly

Security is a community effort. Your vigilance helps protect everyone.`,
      },
    ],
  },
  {
    id: "roadmap",
    title: "Roadmap",
    icon: Rocket,
    content: [
      {
        title: "Current Phase: Foundation",
        body: `We're currently focused on building the core platform:

LIVE NOW:
- Claude Chat: Fully functional AI chat interface
- AI Image Generator: Create images with Fal AI
- Documentation: Comprehensive guides (you're reading them)
- Community: Building and growing

IN DEVELOPMENT:
- Token Sniper
- X Tracker
- Wallet Analytics
- Arb Scanner
- Copy Trader

INFRASTRUCTURE:
- Scalable backend architecture
- Security audits ongoing
- Performance optimization
- User feedback integration

This phase is about getting the fundamentals right. Every feature we launch will be polished and functional — we don't ship broken products.`,
      },
      {
        title: "Phase 2: Trading Suite",
        body: `Next phase focuses on trading utilities:

TOKEN SNIPER
- Automated token sniping
- Intelligent filtering
- Risk management features
- Performance analytics

X TRACKER
- Real-time account monitoring
- Keyword alerts
- Sentiment analysis
- Influencer insights

WALLET ANALYTICS
- Comprehensive wallet tracking
- Trading pattern analysis
- Performance metrics
- Comparison tools

TARGET: Q2 2025
Phase 2 represents our commitment to building tools that actually help traders compete. Not toys — real utilities.`,
      },
      {
        title: "Phase 3: Advanced Features",
        body: `Building on the foundation:

ARB SCANNER
- Cross-DEX opportunity detection
- Execution pathway optimization
- Historical analysis
- Real-time alerts

COPY TRADER
- Automated trade replication
- Customizable parameters
- Risk management
- Performance tracking

ENHANCED AI
- Improved Claude integration
- On-chain analysis capabilities
- Strategy recommendations
- Market intelligence

TARGET: Q3-Q4 2025
Phase 3 adds sophisticated features for advanced users while maintaining accessibility for everyone.`,
      },
      {
        title: "Long-Term Vision",
        body: `Where we're heading:

PLATFORM ECOSYSTEM
- API access for developers
- Third-party integrations
- Plugin architecture
- Community contributions

TOKEN UTILITY
- Platform access tiers
- Governance participation
- Staking rewards
- Holder benefits

COMMUNITY GROWTH
- Educational resources
- Trading competitions
- Community features
- Ambassador program

TECHNOLOGY EVOLUTION
- Multi-chain expansion
- Advanced AI capabilities
- Mobile applications
- Real-time collaboration

Our vision is to be the essential AI-powered platform for Solana traders. Everything we build moves toward that goal.

This roadmap is a guide, not a promise. We'll adapt based on market conditions, community feedback, and technical realities. What won't change is our commitment to building useful, secure, and innovative tools.`,
      },
    ],
  },
]

function CodeAnimation() {
  const [visibleLines, setVisibleLines] = useState<string[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleLines((prev) => {
        const newLines = [...prev, CODE_LINES[currentIndex % CODE_LINES.length]]
        if (newLines.length > 5) newLines.shift()
        return newLines
      })
      setCurrentIndex((prev) => prev + 1)
    }, 2000)

    return () => clearInterval(interval)
  }, [currentIndex])

  return (
    <div className="absolute top-0 right-0 w-1/3 h-full overflow-hidden opacity-10 pointer-events-none hidden lg:block">
      <div className="font-mono text-xs text-primary space-y-2 p-4">
        {visibleLines.map((line, i) => (
          <div key={i} className="animate-fade-in whitespace-nowrap">
            <span className="text-muted-foreground mr-2">{">>"}</span>
            {line}
          </div>
        ))}
      </div>
    </div>
  )
}

export function DocsContent() {
  const [activeSection, setActiveSection] = useState("introduction")
  const [searchQuery, setSearchQuery] = useState("")
  const [copiedCA, setCopiedCA] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const CA_ADDRESS = "TBA"

  const handleCopyCA = () => {
    navigator.clipboard.writeText(CA_ADDRESS)
    setCopiedCA(true)
    setTimeout(() => setCopiedCA(false), 2000)
  }

  const activeContent = sections.find((s) => s.id === activeSection)

  const filteredSections = searchQuery
    ? sections.filter(
        (s) =>
          s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.content.some(
            (c) =>
              c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              c.body.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
      )
    : sections

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="flex items-center justify-between px-4 lg:px-8 h-16">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-primary/30">
                <Image src="/images/aivon-logo.png" alt="Aivon AI" fill className="object-cover scale-125" />
              </div>
              <span className="font-display font-bold text-lg">AIVON</span>
            </Link>
            <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground">
              <ChevronRight className="w-3 h-3" />
              <span>Documentation</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* CA Display */}
            <button
              onClick={handleCopyCA}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-background/50 border border-border hover:border-primary rounded-full transition-all text-xs font-mono"
            >
              <span className="text-muted-foreground">CA:</span>
              <span>{CA_ADDRESS}</span>
              {copiedCA ? (
                <Check className="w-3 h-3 text-green-500" />
              ) : (
                <Copy className="w-3 h-3 text-muted-foreground" />
              )}
            </button>

            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Home</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside className="hidden lg:block fixed left-0 top-16 bottom-0 w-72 border-r border-border bg-background/50 overflow-y-auto">
          <div className="p-6">
            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search docs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-muted/30 border border-border rounded-lg text-sm focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            {/* Navigation */}
            <nav className="space-y-1">
              {filteredSections.map((section) => {
                const Icon = section.icon
                const isActive = activeSection === section.id
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                      isActive
                        ? "bg-primary/10 text-primary border border-primary/30"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{section.title}</span>
                  </button>
                )
              })}
            </nav>

            {/* Claude Badge */}
            <div className="mt-8 p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Bot className="w-4 h-4 text-primary" />
                <span className="text-xs font-mono text-primary">POWERED BY CLAUDE</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Aivon AI is built on Anthropic's Claude — the most thoughtful AI model.
              </p>
            </div>
          </div>
        </aside>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg"
        >
          <BookOpen className="w-6 h-6" />
        </button>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-40 bg-background/95 backdrop-blur-md pt-16 overflow-y-auto">
            <div className="p-6">
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search docs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-muted/30 border border-border rounded-lg text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <nav className="space-y-1">
                {filteredSections.map((section) => {
                  const Icon = section.icon
                  return (
                    <button
                      key={section.id}
                      onClick={() => {
                        setActiveSection(section.id)
                        setMobileMenuOpen(false)
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm transition-all ${
                        activeSection === section.id ? "bg-primary/10 text-primary" : "text-muted-foreground"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{section.title}</span>
                    </button>
                  )
                })}
              </nav>
            </div>
          </div>
        )}

        {/* Main content */}
        <main className="flex-1 lg:ml-72 min-h-screen relative">
          <CodeAnimation />

          <div className="max-w-4xl mx-auto px-6 py-12">
            {activeContent && (
              <div className="space-y-12">
                {/* Section header */}
                <div className="border-b border-border pb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-primary/10 border border-primary/30 rounded-lg flex items-center justify-center">
                      <activeContent.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h1 className="font-display text-3xl md:text-4xl font-bold">{activeContent.title}</h1>
                  </div>
                  <p className="text-muted-foreground font-mono text-sm">
                    AIVON AI / Documentation / {activeContent.title}
                  </p>
                </div>

                {/* Content blocks */}
                {activeContent.content.map((block, index) => (
                  <div key={index} className="space-y-4">
                    <h2 className="font-display text-xl md:text-2xl font-semibold flex items-center gap-3">
                      <span className="text-primary font-mono text-sm">0{index + 1}</span>
                      {block.title}
                    </h2>
                    <div className="prose prose-invert max-w-none">
                      <div className="text-muted-foreground leading-relaxed whitespace-pre-line font-mono text-sm">
                        {block.body}
                      </div>
                    </div>
                    {index < activeContent.content.length - 1 && <div className="border-b border-border/50 pt-8" />}
                  </div>
                ))}

                {/* Navigation */}
                <div className="border-t border-border pt-8 mt-12">
                  <div className="flex justify-between items-center">
                    {sections.findIndex((s) => s.id === activeSection) > 0 && (
                      <button
                        onClick={() => {
                          const currentIndex = sections.findIndex((s) => s.id === activeSection)
                          setActiveSection(sections[currentIndex - 1].id)
                        }}
                        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Previous</span>
                      </button>
                    )}
                    {sections.findIndex((s) => s.id === activeSection) < sections.length - 1 && (
                      <button
                        onClick={() => {
                          const currentIndex = sections.findIndex((s) => s.id === activeSection)
                          setActiveSection(sections[currentIndex + 1].id)
                        }}
                        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors ml-auto"
                      >
                        <span>Next</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
