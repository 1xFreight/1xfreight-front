-- MySQL dump 10.13  Distrib 9.0.1, for macos14.7 (arm64)
--
-- Host: localhost    Database: makeitd_1xfreight
-- ------------------------------------------------------
-- Server version	9.0.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `blog`
--

DROP TABLE IF EXISTS `blog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blog` (
  `id` int NOT NULL AUTO_INCREMENT,
  `link` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `text` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `keywords` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blog`
--

LOCK TABLES `blog` WRITE;
/*!40000 ALTER TABLE `blog` DISABLE KEYS */;
INSERT INTO `blog` VALUES (1,'global-freight-rates-continue-to-decline-amid-weakened-demand','Global Freight Rates Continue to Decline Amid Weakened Demand','<h3><strong>The standard Lorem Ipsum passage, used since the 1500s</strong></h3><p>\"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\"</p><h3><strong>Section 1.10.32 of \"de Finibus Bonorum et Malorum\", written by Cicero in 45 BC</strong></h3><p>\"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?\"</p><h3><strong>1914 translation by H. Rackham</strong></h3>','img_67224b4b0f89c.png',NULL,NULL,'2024-10-30 13:05:47','2024-10-30 13:05:47');
/*!40000 ALTER TABLE `blog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `demo_form_submissions`
--

DROP TABLE IF EXISTS `demo_form_submissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `demo_form_submissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `company` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `who_you_are` varchar(255) DEFAULT NULL,
  `estimate_number` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `demo_form_submissions`
--

LOCK TABLES `demo_form_submissions` WRITE;
/*!40000 ALTER TABLE `demo_form_submissions` DISABLE KEYS */;
INSERT INTO `demo_form_submissions` VALUES (1,'Purple Light INC','Emma Starck','emma.starck@testmail.com','060335178',NULL,NULL,'2024-12-17 09:51:18','2024-12-17 09:51:18'),(2,'Purple Light INC','Emma Starck','emma.starck@testmail.com','060335178',NULL,NULL,'2024-12-17 09:53:25','2024-12-17 09:53:25'),(3,'Purple Light INC','Emma Starck','emma.starck@testmail.com','060335178',NULL,NULL,'2024-12-17 09:57:08','2024-12-17 09:57:08'),(4,'Purple Light INC','Emma Starck','emma.starck@testmail.com','060335178',NULL,NULL,'2024-12-17 09:57:30','2024-12-17 09:57:30'),(5,'Purple Light INC','Emma Starck','emma.starck@testmail.com','060335178',NULL,NULL,'2024-12-17 09:59:31','2024-12-17 09:59:31');
/*!40000 ALTER TABLE `demo_form_submissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `info_policy`
--

DROP TABLE IF EXISTS `info_policy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `info_policy` (
  `id` int NOT NULL AUTO_INCREMENT,
  `text` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `info_policy`
--

LOCK TABLES `info_policy` WRITE;
/*!40000 ALTER TABLE `info_policy` DISABLE KEYS */;
INSERT INTO `info_policy` VALUES (1,'<h4>Privacy Policy</h4><p>By using the Products, you agree to be bound by our&nbsp;Privacy Policy&nbsp;posted on our website, which is incorporated into these Terms of Use. Please be advised the Products are hosted in the United States. If you access the Products from any other region of the world with laws or other requirements governing personal data collection, use, or disclosure that differ from applicable laws in the United States, then through your continued use of the Products, you are transferring your data to the United States, and you agree to have your data transferred to and processed in the United States.<br>&nbsp;</p><p><strong>Term and Termination</strong></p><p>These Terms of Use shall remain in full force and effect while you use the Products. WITHOUT LIMITING ANY OTHER PROVISION OF THESE TERMS OF USE, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE PRODUCTS (INCLUDING BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY REASON OR FOR NO REASON, INCLUDING WITHOUT LIMITATION FOR BREACH OF ANY REPRESENTATION, WARRANTY, OR COVENANT CONTAINED IN THESE TERMS OF USE OR OF ANY APPLICABLE LAW OR REGULATION. WE MAY TERMINATE YOUR USE OR PARTICIPATION IN THE PRODUCTS OR DELETE YOUR ACCOUNT AND ANY CONTENT OR INFORMATION THAT YOU POSTED AT ANY TIME, WITHOUT WARNING, IN OUR SOLE DISCRETION.</p><p>If we terminate or suspend your account for any reason, you are prohibited from registering and creating a new account under your name, a fake or borrowed name, or the name of any third party, even if you may be acting on behalf of the third party. In addition to terminating or suspending your account, we reserve the right to take appropriate legal action, including without limitation pursuing civil, criminal, and injunctive redress.</p><h4>Modifications and Interruptions</h4><p>We reserve the right to change, modify, or remove the contents of the Products at any time or for any reason at our sole discretion without notice. However, we have no obligation to update any information on our Products. We also reserve the right to modify or discontinue all or part of the Products without notice at any time. We will not be liable to you or any third party for any modification, price change, suspension, or discontinuance of the Products.</p><p>We cannot guarantee the Products will be available at all times. We may experience hardware, software, or other problems or need to perform maintenance related to the Products, resulting in interruptions, delays, or errors. We reserve the right to change, revise, update, suspend, discontinue, or otherwise modify the Products at any time or for any reason without notice to you. You agree that we have no liability whatsoever for any loss, damage, or inconvenience caused by your inability to access or use the Products during any downtime or discontinuance of the Products. Nothing in these Terms of Use will be construed to obligate us to maintain and support the Products or to supply any corrections, updates, or releases in connection therewith.</p><h4>Governing Law</h4><p>These Terms of Use and your use of the Products are governed by and construed in accordance with the laws of the State of California applicable to agreements made and to be entirely performed within the State of California, without regard to its conflict of law principles.</p><p><strong>Dispute Resolution‍</strong></p><p>These Terms of Use shall be governed by and construed in accordance with the laws of the State of California. You agree to the non-exclusive jurisdiction of the courts in the County of Los Angeles, California, United States of America for any disputes, claim or cause of action arising out of, or relating to or in connection with these Terms of Use or your use of the Products, including any disputes relating to the existence or validity of these Terms of Use, provided that you agree to submit any such disputes, claims or causes of action exclusively to the courts of the County of Los Angeles, California, United States of America.</p><p>To expedite resolution and control the cost of any dispute, controversy, or claim related to these Terms of Use (each a \"Dispute\" and collectively, the “Disputes”) brought by either you or us (individually, a “Party” and collectively, the “Parties”), the Parties agree to first attempt to negotiate any Dispute (except those Disputes expressly provided below) informally for at least 60 days before initiating arbitration. Such informal negotiations commence upon written notice from one Party to the other Party.</p><p><strong>Corrections</strong></p><p>There may be information on the Products that contains typographical errors, inaccuracies, or omissions, including descriptions, pricing, availability, and various other information. We reserve the right to correct any errors, inaccuracies, or omissions and to change or update the information on the Products at any time, without prior notice.</p><p><strong>Disclaimers</strong></p><p>THE COMPANY IS NOT A FREIGHT BROKER, FREIGHT AGENT, OR FREIGHT FORWARDER. WE ARE NOT PARTY TO TRANSACTIONS BETWEEN BUYER AND SELLER, AND DO NOT GUARANTEE SERVICES RENDERED NOR PAYMENT BETWEEN PARTIES.</p><p>THE PRODUCTS ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE PRODUCTS AND OUR SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE PRODUCTS AND YOUR USE THEREOF, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE MAKE NO WARRANTIES OR REPRESENTATIONS ABOUT THE ACCURACY OR COMPLETENESS OF THE PRODUCTS’ CONTENT OR THE CONTENT OF ANY WEBSITES LINKED TO THE PRODUCTS AND WE WILL ASSUME NO LIABILITY OR RESPONSIBILITY FOR ANY (1) ERRORS, MISTAKES, OR INACCURACIES OF CONTENT AND MATERIALS, (2) PERSONAL INJURY OR PROPERTY DAMAGE, OF ANY NATURE WHATSOEVER, RESULTING FROM YOUR ACCESS TO AND USE OF THE PRODUCTS, (3) ANY UNAUTHORIZED ACCESS TO OR USE OF OUR SECURE SERVERS AND/OR ANY AND ALL PERSONAL INFORMATION AND/OR FINANCIAL INFORMATION STORED THEREIN, (4) ANY INTERRUPTION OR CESSATION OF TRANSMISSION TO OR FROM THE PRODUCTS, (5) ANY BUGS, VIRUSES, TROJAN HORSES, OR THE LIKE WHICH MAY BE TRANSMITTED TO OR THROUGH THE PRODUCTS BY ANY THIRD PARTY, AND/OR (6) ANY ERRORS OR OMISSIONS IN ANY CONTENT AND MATERIALS OR FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF ANY CONTENT POSTED, TRANSMITTED, OR OTHERWISE MADE AVAILABLE VIA THE PRODUCTS. WE DO NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME RESPONSIBILITY FOR ANY PRODUCT OR SERVICE ADVERTISED OR OFFERED BY A THIRD PARTY THROUGH THE PRODUCTS, ANY HYPERLINKED WEBSITE, OR ANY WEBSITE OR MOBILE APPLICATION FEATURED IN ANY BANNER OR OTHER ADVERTISING, AND WE WILL NOT BE A PARTY TO OR IN ANY WAY BE RESPONSIBLE FOR MONITORING ANY TRANSACTION BETWEEN YOU AND ANY THIRD-PARTY PROVIDERS OF PRODUCTS OR SERVICES. AS WITH THE PURCHASE OF A PRODUCT OR SERVICE THROUGH ANY MEDIUM OR IN ANY ENVIRONMENT, YOU SHOULD USE YOUR BEST JUDGMENT AND EXERCISE CAUTION WHERE APPROPRIATE.</p><p>Limitations of Liability</p><p>IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE PRODUCTS, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED HEREIN, OUR LIABILITY TO YOU FOR ANY CAUSE WHATSOEVER AND REGARDLESS OF THE FORM OF THE ACTION, WILL AT ALL TIMES BE LIMITED TO THE AMOUNT PAID, IF ANY, BY YOU TO US DURING THE 3 MONTH PERIOD PRIOR TO ANY CAUSE OF ACTION ARISING. CERTAIN US STATE LAWS AND INTERNATIONAL LAWS DO NOT ALLOW LIMITATIONS ON IMPLIED WARRANTIES OR THE EXCLUSION OR LIMITATION OF CERTAIN DAMAGES. IF THESE LAWS APPLY TO YOU, SOME OR ALL OF THE ABOVE DISCLAIMERS OR LIMITATIONS MAY NOT APPLY TO YOU, AND YOU MAY HAVE ADDITIONAL RIGHTS.</p><p><strong>Indemnification</strong></p><p>You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our respective officers, agents, partners, and employees, from and against any loss, damage, liability, claim, or demand, including reasonable attorneys’ fees and expenses, made by any third party due to or arising out of: (1) your use of the Products; (2) your breach of these Terms of Use; (3) any breach of your representations and warranties set forth in these Terms of Use; (4) your violation of the rights of a third party, including but not limited to intellectual property rights; or (5) any overt harmful act toward any other user of the Products with whom you connected via the Products. Notwithstanding the foregoing, we reserve the right, at your expense, to assume the exclusive defense and control of any matter for which you are required to indemnify us, and you agree to cooperate, at your expense, with our defense of such claims. We will use reasonable efforts to notify you of any such claim, action, or proceeding which is subject to this indemnification upon becoming aware of it.</p><p><strong>User Data</strong></p><p>We will maintain certain user and company data that you transmit to the Products for the purpose of managing the performance of the Products, as well as data relating to your use of the Products. Although we perform regular routine backups of data, you are solely responsible for all data that you transmit or that relates to any activity you have undertaken using the Products. You agree that we shall have no liability to you for any loss or corruption of any such data, and you hereby waive any right of action against us arising from any such loss or corruption of such data.</p><p><strong>&nbsp;Communications, Transactions, and Signatures</strong></p><p>Visiting the Products, sending us emails, and completing online forms constitute electronic communications. You consent to receive electronic communications, and you agree that all agreements, notices, disclosures, and other communications we provide to you electronically, via email and on the Products, satisfy any legal requirement that such communication be in writing. YOU HEREBY AGREE TO THE USE OF ELECTRONIC SIGNATURES, CONTRACTS, ORDERS, AND OTHER RECORDS, AND TO ELECTRONIC DELIVERY OF NOTICES, POLICIES, AND RECORDS OF TRANSACTIONS INITIATED OR COMPLETED BY US OR VIA THE PRODUCTS. You hereby waive any rights or requirements under any statutes, regulations, rules, ordinances, or other laws in any jurisdiction which require an original signature or delivery or retention of non-electronic records, or to payments or the granting of credits by any means other than electronic means.</p><h4>Miscellaneous</h4><p>These Terms of Use and any policies or operating rules posted by us on the Products or in respect to the Products constitute the entire agreement and understanding between you and us. Our failure to exercise or enforce any right or provision of these Terms of Use shall not operate as a waiver of such right or provision. These Terms of Use operate to the fullest extent permissible by law. We may assign any or all of our rights and obligations to others at any time. We shall not be responsible or liable for any loss, damage, delay, or failure to act caused by any cause beyond our reasonable control. If any provision or part of a provision of these Terms of Use is determined to be unlawful, void, or unenforceable, that provision or part of the provision is deemed severable from these Terms of Use and does not affect the validity and enforceability of any remaining provisions. There is no joint venture, partnership, employment or agency relationship created between you and us as a result of these Terms of Use or use of the Products. You agree that these Terms of Use will not be construed against us by virtue of having drafted them. You hereby waive any and all defenses you may have based on the electronic form of these Terms of Use and the lack of signing by the parties hereto to execute these Terms of Use.</p><h4>Contact Us</h4><p>In order to resolve a complaint regarding the Products or to receive further information regarding use of the Products, please contact us at info@portexpro.com.</p>','2024-10-29 15:38:03','2024-10-30 13:06:27');
/*!40000 ALTER TABLE `info_policy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `info_terms`
--

DROP TABLE IF EXISTS `info_terms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `info_terms` (
  `id` int NOT NULL AUTO_INCREMENT,
  `text` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `info_terms`
--

LOCK TABLES `info_terms` WRITE;
/*!40000 ALTER TABLE `info_terms` DISABLE KEYS */;
INSERT INTO `info_terms` VALUES (1,'<h4><strong>Agreement to Terms</strong></h4><p>These Terms of Use constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and Portex Inc. (\"Company\", “we”, “us”, or “our”), concerning your access to and use of the Portex applications, software, and services (collectively, the “Products”). You agree that by accessing the Products, you have read, understood, and agree to be bound by all of these Terms of Use. IF YOU DO NOT AGREE WITH ALL OF THESE TERMS OF USE, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE PRODUCTS AND YOU MUST DISCONTINUE USE IMMEDIATELY.</p><p>Supplemental terms and conditions or documents that may be posted on the Products from time to time are hereby expressly incorporated herein by reference. We reserve the right, in our sole discretion, to make changes or modifications to these Terms of Use at any time and for any reason. We will alert you by email about any changes and by updating the “Last updated” date of these Terms of Use. You will be subject to, and will be deemed to have been made aware of and to have accepted, the changes in any revised Terms of Use by your continued use of the Products after the date such revised Terms of Use are posted.</p><p>The information provided on the Products is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation or which would subject us to any registration requirement within such jurisdiction or country. Accordingly, those persons who choose to access the Products from other locations do so on their own initiative and are solely responsible for compliance with local laws, if and to the extent local laws are applicable.</p><h4>Intellectual Property</h4><p>Unless otherwise indicated, the Products are our proprietary property and all source code, databases, functionality, software, website designs, text, within the Products (collectively, the “Content”) are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights and unfair competition laws of the United States, international copyright laws, and international conventions. The Content is provided in the Products to you “AS IS.”</p><h4>Confidentiality and Non-Disclosure</h4><p>Portex may disclose to you, or you may otherwise learn of or discover, our documents, business practices, pricing, software code, capabilities, systems, current and future plans, financial information, processes, or other aspects of our business (“Our Information”). You hereby agree and acknowledge that Our Information is confidential and shall be our sole and exclusive intellectual property and proprietary information. You agree to use Our Information only for the specific purposes as allowed by these Terms of Use. Any disclosure of Our Information to a third party, specifically including a competitor, is prohibited. All obligations contained herein shall survive the termination of this agreement. You acknowledge that Our Information is proprietary, confidential and extremely valuable to us, and that we would be materially damaged by your disclosure of Our Information. You acknowledge and agree that monetary damages provide an insufficient remedy for the breach of this confidentiality obligation, and that we shall be entitled to injunctive relief.</p><h4>User Representations</h4><p>By using the Products, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary; (3) you have the legal capacity and you agree to comply with these Terms of Use; (4) you will not access the Products through automated or non-human means, whether through a bot, script or otherwise without express written consent from us; (5) you will not use the Products for any illegal or unauthorized purpose; and (6) your use of the Products will not violate any applicable law or regulation (7) you will use the Products only from within the United States of America.</p><p>If you provide any information that is untrue, inaccurate, not current, or incomplete, we have the right to suspend or terminate your account and refuse any and all current or future use of the Products (or any portion thereof).</p><p><strong>User Registration</strong></p><p>You may be required to register with the Products. You agree to keep your password confidential and will be responsible for all use of your account and password. We reserve the right to remove, reclaim, or change a username you select if we determine, in our sole discretion, that such username is inappropriate, obscene, or otherwise objectionable.</p><p><strong>Fees and Payment</strong></p><p>You may be required to purchase or pay a fee to access some of our services. You agree to provide current, complete, and accurate purchase and account information for all purchases made via the Products. You further agree to promptly update account and payment information, including email address, payment method, and payment card expiration date, so that we can complete your transactions and contact you as needed. We bill you through an online billing account for purchases made via the Products. Sales tax may be added to the price of purchases as deemed required by us. We may change prices at any time. All payments shall be in U.S. dollars.You agree to pay all charges or fees at the prices then in effect for your purchases, and you authorize us to charge your chosen payment provider for any such amounts upon making your purchase. If your purchase is subject to recurring charges, then you consent to our charging your payment method on a recurring basis without requiring your prior approval for each recurring charge, until you notify us of your cancellation. We reserve the right to correct any errors or mistakes in pricing, even if we have already requested or received payment. We also reserve the right to refuse any order placed through the Products.</p><p><strong>Cancellation</strong></p><p>All purchases are non-refundable. You can cancel your subscription at any time by contacting us using the contact information provided below. Your cancellation will take effect at the end of the current paid term.&nbsp;</p><p>If you are unsatisfied with our services, please email us at info@portexpro.com.</p><p><strong>Software</strong></p><p>We may include software for use in connection with our services. If such software is accompanied by an end user license agreement (“EULA”), the terms of the EULA will govern your use of the software. If such software is not accompanied by a EULA, then we grant to you a non-exclusive, revocable, and non-transferable license to use such software solely in connection with our services and in accordance with these Terms of Use. Any Software and any related documentation is provided “as is” without warranty of any kind, either express or implied, including, without limitation, the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. You accept any and all risk arising out of use or performance of any Software. You may not reproduce or redistribute any software except in accordance with the EULA or these Terms of Use.</p><p><strong>Prohibited Activities</strong></p><p>You may not access or use the Products for any purpose other than that for which we make the Products available. The Products may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.</p><p>As a user of the Products, you agree not to:</p><ol><li>Systematically retrieve data or other content from the Products to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.</li><li>Make any unauthorized use of the Products, including collecting usernames and/or email addresses of users by electronic or other means for the purpose of sending unsolicited email, or creating user accounts by automated means or under false pretenses.</li><li>&nbsp;Circumvent, disable, or otherwise interfere with security-related features of the Products, including features that prevent or restrict the use or copying of any Content or enforce limitations on the use of the Products and/or the Content contained therein.</li><li>Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords.</li><li>Engage in any automated use of the system, such as using scripts to send comments or messages, or using any data mining, robots, or similar data gathering and extraction tools.</li><li>Interfere with, disrupt, or create an undue burden on the Products or the networks or services connected to the Products.</li><li>Use the Products as part of any effort to compete with us.</li><li>Decipher, decompile, disassemble, or reverse engineer any of the software comprising or in any way making up a part of the Products.</li><li>Attempt to bypass any measures of the Products designed to prevent or restrict access to the Products, or any portion of the Products.</li><li>Copy or adapt the Products’ software, including but not limited to HTML, JavaScript, or other code. Except as may be the result of standard search engine or Internet browser usage, use, launch, develop, or distribute any automated system, including without limitation, any spider, robot, cheat utility, scraper, or offline reader that accesses the Products, or using or launching any unauthorized script or other software.</li><li>Except as may be the result of standard search engine or Internet browser usage, use, launch, develop, or distribute any automated system, including without limitation, any spider, robot, cheat utility, scraper, or offline reader that accesses the Products, or using or launching any unauthorized script or other software.</li><li>&nbsp;Use the Products in a manner inconsistent with any applicable laws or regulations.</li><li>Use the Products from a country or jurisdiction outside of the United States of America.</li></ol><p><strong>Site &amp; Product Engagement</strong></p><p>We reserve the right to: (1) monitor the Products for violations of these Terms of Use; (2) take appropriate legal action against anyone who, in our sole discretion, violates the law or these Terms of Use; (3) in our sole discretion and without limitation, notice, or liability, to remove from the Products or otherwise disable all content that are in any way burdensome to our systems; and (4) otherwise manage the Products in a manner designed to protect our rights and property and to facilitate the proper functioning of the Products.</p>','2024-10-29 15:38:16','2024-10-30 13:06:08');
/*!40000 ALTER TABLE `info_terms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `meta_tags`
--

DROP TABLE IF EXISTS `meta_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `meta_tags` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `meta_description` text,
  `keywords` text,
  `page` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `meta_tags`
--

LOCK TABLES `meta_tags` WRITE;
/*!40000 ALTER TABLE `meta_tags` DISABLE KEYS */;
INSERT INTO `meta_tags` VALUES (1,NULL,'Streamline Freight Management with','Transform your freight procurement with 1xFreight, a cost-effective and efficient platform for managing freight across all modes. Achieve a 90% time reduction, save over 15 hours weekly, and reduce freight costs by up to 30%. Onboard your team and partners in 10 minutes and gain centralized control of shipments, rates, and insights. Book a demo today and join over 2,000 trusted clients.','Freight management platform, Freight procurement software, Real-time rate comparison, Centralized freight management, Time-saving freight solutions, Cost reduction in logistics, TMS alternative, Freight, analytics and insights, Trucking and international shipments, Partner onboarding','home','2024-10-30 13:10:09','2024-10-30 13:10:09'),(2,NULL,'News','Stay updated with the latest insights, strategies, and trends in freight procurement and logistics management. Discover time-saving tips, cost-reduction techniques, and innovations in real-time rate comparison and centralized freight management. Explore how 1xFreight can streamline operations for businesses of all sizes.','Freight procurement blog, Logistics management tips, Freight cost reduction, Freight rate comparison, Centralized logistics insights, Freight efficiency strategies, Freight management trends, 1xFreight platform news, Shipping and logistics updates, Freight management best practices','blog','2024-10-30 13:11:22','2024-10-30 13:11:22'),(3,NULL,'Book a Demo','See 1xFreight in action! Book a demo to explore how our platform can streamline rate requests, centralize communication, provide insightful freight cost analysis, and simplify partner collaboration. Get started in 10 minutes and experience time and cost savings up to 90% for your freight operations.','Book a demo freight platform, Freight management demo, Streamlined rate requests, Centralized communication in logistics, Freight cost analysis demo, 1xFreight platform benefits,Freight partner onboarding, Demo logistics software','demo','2024-10-30 13:12:43','2024-10-30 13:12:43'),(4,NULL,'Privat Policy','Learn how 1xFreight respects and protects your privacy. Our Privacy Policy outlines the data we collect, why it’s collected, and how we secure your information. Read about our commitment to transparency and your rights over your data.','Privacy policy freight platform, Data security 1xFreight, User data protection, Data transparency policy, Freight platform privacy','policy','2024-10-30 13:15:56','2024-10-30 13:15:56'),(5,NULL,'Terms and conditions','Understand the terms and conditions of using 1xFreight. Our Terms outline your rights and responsibilities while using our freight procurement platform, including payment, limitations, and privacy. Stay informed with clear guidelines on service use.','Terms and conditions 1xFreight, Freight platform usage terms, 1xFreight service terms, User responsibilities logistics platform, Freight procurement terms','terms','2024-10-30 13:16:32','2024-10-30 13:16:58');
/*!40000 ALTER TABLE `meta_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'2014_10_12_000000_create_users_table',1),(2,'2014_10_12_100000_create_password_reset_tokens_table',1),(3,'2014_10_12_200000_add_two_factor_columns_to_users_table',1),(4,'2019_08_19_000000_create_failed_jobs_table',1),(5,'2019_12_14_000001_create_personal_access_tokens_table',1),(6,'2024_10_29_124953_create_sessions_table',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `ip_address` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('Vlx67iUVfrmWWnJL3fwoBKlSxEVvfnOrCDY4w6ct',4,'127.0.0.1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36','YTo2OntzOjY6Il90b2tlbiI7czo0MDoiZnJrTzUxUTd0WG12SWt4THdwa2VQUHhYSmpTSk5GMGpqdzhHZlllaiI7czoxMzoic2Vzc2lvbl90b2tlbiI7czo0MDoiRVFIbUk2ejlwTUtBUkVNVU5WWlRuWmtIV3dhS0lGRW1ncENHQzVkRSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NjQ6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9kYXNoYm9hcmQvYm9va2luZy82NzczZDk0NTBiMGUzYzBhYWUwYWY5ZTYiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjM6InVybCI7YTowOnt9czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6NDt9',1736172268);
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `role` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `two_factor_secret` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `two_factor_recovery_codes` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `two_factor_confirmed_at` timestamp NULL DEFAULT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `current_team_id` bigint unsigned DEFAULT NULL,
  `profile_photo_path` varchar(2048) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (4,'admin','Admin','1xfreight@admin.com',NULL,'$2y$10$4JkwHpjQYAOWbbcm9z0zvuc68H.gB39FIWAhlwMm2yzjgHqD/tTem',NULL,NULL,NULL,NULL,NULL,NULL,'2024-11-07 12:06:12','2024-11-07 12:06:12');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visits`
--

DROP TABLE IF EXISTS `visits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `visits` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ip` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `year` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `month` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `day` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=94 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visits`
--

LOCK TABLES `visits` WRITE;
/*!40000 ALTER TABLE `visits` DISABLE KEYS */;
INSERT INTO `visits` VALUES (1,'127.0.0.1','2024','10','29','2024-10-29 15:59:44','2024-10-29 15:59:44'),(2,'127.0.0.1','2024','10','30','2024-10-30 09:59:55','2024-10-30 09:59:55'),(3,'2a00:23c7:f293:4501:5150:d5cc:5718:397f','2024','10','30','2024-10-30 09:13:29','2024-10-30 09:13:29'),(4,'77.89.203.10','2024','10','30','2024-10-30 09:17:12','2024-10-30 09:17:12'),(5,'149.154.161.246','2024','10','30','2024-10-30 09:26:30','2024-10-30 09:26:30'),(6,'2607:fa49:a83f:9900:9cf4:5c71:8c05:b029','2024','10','30','2024-10-30 09:27:53','2024-10-30 09:27:53'),(7,'185.198.46.161','2024','10','30','2024-10-30 09:28:15','2024-10-30 09:28:15'),(8,'89.45.2.5','2024','10','30','2024-10-30 09:45:19','2024-10-30 09:45:19'),(9,'2a00:23c7:f293:4501:3185:6fc0:4621:4309','2024','10','30','2024-10-30 12:16:35','2024-10-30 12:16:35'),(10,'46.166.62.232','2024','10','30','2024-10-30 12:36:40','2024-10-30 12:36:40'),(11,'2a00:1858:1029:8433:69c0:3574:917d:bdba','2024','10','30','2024-10-30 18:10:14','2024-10-30 18:10:14'),(12,'2a00:1858:1029:8433:5c99:5a38:bc80:7604','2024','10','31','2024-10-31 07:11:57','2024-10-31 07:11:57'),(13,'2a00:23c7:f293:4501:ad3c:9231:fffa:59a4','2024','10','31','2024-10-31 07:47:20','2024-10-31 07:47:20'),(14,'77.89.203.10','2024','10','31','2024-10-31 09:09:36','2024-10-31 09:09:36'),(15,'185.198.46.161','2024','10','31','2024-10-31 13:01:46','2024-10-31 13:01:46'),(16,'2a03:2880:32ff:7e::face:b00c','2024','10','31','2024-10-31 13:05:15','2024-10-31 13:05:15'),(17,'2a03:2880:32ff:1::face:b00c','2024','10','31','2024-10-31 13:05:19','2024-10-31 13:05:19'),(18,'2a03:2880:32ff:8::face:b00c','2024','10','31','2024-10-31 13:05:19','2024-10-31 13:05:19'),(19,'2a03:2880:31ff:3::face:b00c','2024','10','31','2024-10-31 13:05:30','2024-10-31 13:05:30'),(20,'2a03:2880:11ff:3::face:b00c','2024','10','31','2024-10-31 13:05:31','2024-10-31 13:05:31'),(21,'2a00:23c7:f293:4501:59fe:29b4:521e:d0e2','2024','10','31','2024-10-31 14:31:07','2024-10-31 14:31:07'),(22,'2a00:1858:1029:8433:a00e:e038:886b:f0a0','2024','10','31','2024-10-31 15:57:33','2024-10-31 15:57:33'),(23,'2a00:1858:1029:8433:a17f:2b6c:ea35:37b0','2024','10','31','2024-10-31 17:49:04','2024-10-31 17:49:04'),(24,'2a00:1858:1029:8433:c821:e5d9:4d9:2ed1','2024','10','31','2024-10-31 18:29:37','2024-10-31 18:29:37'),(25,'77.89.203.10','2024','11','01','2024-11-01 05:23:58','2024-11-01 05:23:58'),(26,'77.89.203.10','2024','11','01','2024-11-01 05:23:58','2024-11-01 05:23:58'),(27,'46.166.60.70','2024','11','01','2024-11-01 08:21:30','2024-11-01 08:21:30'),(28,'2a00:1858:1029:8433:11c2:6ff1:b7ab:13ff','2024','11','01','2024-11-01 14:32:21','2024-11-01 14:32:21'),(29,'2a00:1858:1029:8433:502a:2bf8:901b:9f85','2024','11','01','2024-11-01 16:41:47','2024-11-01 16:41:47'),(30,'2a00:1858:1029:8433:a4c2:257c:a5fa:314a','2024','11','02','2024-11-02 04:04:22','2024-11-02 04:04:22'),(31,'77.89.203.10','2024','11','02','2024-11-02 05:47:56','2024-11-02 05:47:56'),(32,'46.166.60.70','2024','11','02','2024-11-02 08:16:26','2024-11-02 08:16:26'),(33,'2a00:1858:1029:8433:389d:3ec2:6873:6a45','2024','11','02','2024-11-02 10:38:01','2024-11-02 10:38:01'),(34,'2a00:1858:1029:8433:659a:3cb4:6eba:9ec9','2024','11','02','2024-11-02 15:54:10','2024-11-02 15:54:10'),(35,'2a00:1858:1029:8433:d862:f166:f643:ac7e','2024','11','02','2024-11-02 16:17:40','2024-11-02 16:17:40'),(36,'94.243.70.167','2024','11','02','2024-11-02 17:20:51','2024-11-02 17:20:51'),(37,'2a00:1858:1029:8433:34f7:6135:1af1:23c1','2024','11','03','2024-11-03 03:18:48','2024-11-03 03:18:48'),(38,'77.89.203.10','2024','11','03','2024-11-03 03:50:06','2024-11-03 03:50:06'),(39,'94.243.70.167','2024','11','03','2024-11-03 05:48:21','2024-11-03 05:48:21'),(40,'2a00:1858:1029:8433:898:1df2:43cf:5df2','2024','11','03','2024-11-03 09:56:00','2024-11-03 09:56:00'),(41,'2a00:1858:1029:8433:4020:2e2e:1b67:edd8','2024','11','03','2024-11-03 13:46:24','2024-11-03 13:46:24'),(42,'2a00:1858:1029:8433:1cda:e75f:a045:e878','2024','11','03','2024-11-03 16:17:43','2024-11-03 16:17:43'),(43,'46.166.63.20','2024','11','03','2024-11-03 18:33:55','2024-11-03 18:33:55'),(44,'2a00:1858:1029:8433:48e0:4345:fc71:d146','2024','11','03','2024-11-03 18:57:46','2024-11-03 18:57:46'),(45,'2a00:1858:1029:8433:78a8:61bf:e6aa:d85','2024','11','04','2024-11-04 16:53:57','2024-11-04 16:53:57'),(46,'77.89.203.10','2024','11','05','2024-11-05 05:44:06','2024-11-05 05:44:06'),(47,'2a04:8000:0:e05b::1','2024','11','05','2024-11-05 09:54:03','2024-11-05 09:54:03'),(48,'2a04:8000:0:e05b::1','2024','11','05','2024-11-05 09:54:03','2024-11-05 09:54:03'),(49,'2a00:23c7:f293:4501:31f7:6975:3279:f9ce','2024','11','05','2024-11-05 12:39:52','2024-11-05 12:39:52'),(50,'77.89.203.10','2024','11','06','2024-11-06 04:15:06','2024-11-06 04:15:06'),(51,'77.89.203.10','2024','11','06','2024-11-06 04:15:06','2024-11-06 04:15:06'),(52,'77.89.203.10','2024','11','06','2024-11-06 04:15:06','2024-11-06 04:15:06'),(53,'77.89.203.10','2024','11','06','2024-11-06 04:15:06','2024-11-06 04:15:06'),(54,'77.89.203.10','2024','11','06','2024-11-06 04:15:06','2024-11-06 04:15:06'),(55,'185.198.46.161','2024','11','06','2024-11-06 11:01:21','2024-11-06 11:01:21'),(56,'149.154.161.235','2024','11','06','2024-11-06 11:02:49','2024-11-06 11:02:49'),(57,'2a00:23c7:f293:4501:d9d6:267b:ac09:6cc','2024','11','06','2024-11-06 18:33:17','2024-11-06 18:33:17'),(58,'77.89.203.10','2024','11','07','2024-11-07 11:32:45','2024-11-07 11:32:45'),(59,'2a00:23c7:f293:4501:c1ba:31e:ebcf:3052','2024','11','07','2024-11-07 11:33:12','2024-11-07 11:33:12'),(60,'95.108.213.144','2024','11','07','2024-11-07 21:37:12','2024-11-07 21:37:12'),(61,'213.180.203.187','2024','11','07','2024-11-07 21:39:58','2024-11-07 21:39:58'),(62,'213.180.203.3','2024','11','07','2024-11-07 21:39:59','2024-11-07 21:39:59'),(63,'5.255.231.13','2024','11','07','2024-11-07 21:40:00','2024-11-07 21:40:00'),(64,'95.108.213.230','2024','11','07','2024-11-07 21:40:06','2024-11-07 21:40:06'),(65,'95.108.213.128','2024','11','07','2024-11-07 21:40:06','2024-11-07 21:40:06'),(66,'181.177.123.170','2024','11','10','2024-11-09 22:01:27','2024-11-09 22:01:27'),(67,'181.177.121.248','2024','11','10','2024-11-10 00:39:31','2024-11-10 00:39:31'),(68,'207.90.60.154','2024','11','10','2024-11-10 00:41:25','2024-11-10 00:41:25'),(69,'2a04:8000:0:e05b::1','2024','11','11','2024-11-11 09:04:04','2024-11-11 09:04:04'),(70,'2a04:8000:0:e05b::1','2024','11','11','2024-11-11 09:04:04','2024-11-11 09:04:04'),(71,'2a00:23c7:f293:4501:7ddb:d647:a2ea:9757','2024','11','14','2024-11-14 13:12:03','2024-11-14 13:12:03'),(72,'2a04:8000:0:e05b::1','2024','11','19','2024-11-19 09:38:10','2024-11-19 09:38:10'),(73,'2a04:8000:0:e05b::1','2024','11','19','2024-11-19 09:38:10','2024-11-19 09:38:10'),(74,'2a00:23c7:f293:4501:c0b0:1f65:e233:35d4','2024','11','19','2024-11-19 10:52:48','2024-11-19 10:52:48'),(75,'2a00:23c7:f293:4501:20ef:e2a0:3022:a520','2024','11','26','2024-11-26 19:40:37','2024-11-26 19:40:37'),(76,'2a04:8000:0:e05b::1','2024','11','27','2024-11-27 15:01:22','2024-11-27 15:01:22'),(77,'2a04:8000:0:e05b::1','2024','11','27','2024-11-27 15:01:22','2024-11-27 15:01:22'),(78,'77.89.203.10','2024','11','28','2024-11-28 14:35:19','2024-11-28 14:35:19'),(79,'2a00:23c7:f293:4501:112f:c8fd:a55c:8e50','2024','11','30','2024-11-30 17:21:00','2024-11-30 17:21:00'),(80,'2a00:23c7:f293:4501:d9a:a215:b7a4:1bdf','2024','12','02','2024-12-02 17:50:29','2024-12-02 17:50:29'),(81,'77.89.203.10','2024','12','03','2024-12-03 15:43:54','2024-12-03 15:43:54'),(82,'2a04:8000:0:e05b::1','2024','12','10','2024-12-10 11:40:12','2024-12-10 11:40:12'),(83,'2a04:8000:0:e05b::1','2024','12','10','2024-12-10 11:40:12','2024-12-10 11:40:12'),(84,'77.89.203.10','2024','12','10','2024-12-10 12:21:47','2024-12-10 12:21:47'),(85,'77.89.203.10','2024','12','11','2024-12-11 07:12:15','2024-12-11 07:12:15'),(86,'2a00:23c7:f293:4501:c51a:110c:13b7:14c5','2024','12','12','2024-12-12 13:59:36','2024-12-12 13:59:36'),(87,'77.89.203.10','2024','12','16','2024-12-16 08:29:45','2024-12-16 08:29:45'),(88,'127.0.0.1','2024','12','17','2024-12-17 08:56:19','2024-12-17 08:56:19'),(89,'127.0.0.1','2024','12','18','2024-12-18 05:27:09','2024-12-18 05:27:09'),(90,'127.0.0.1','2024','12','27','2024-12-27 12:31:32','2024-12-27 12:31:32'),(91,'127.0.0.1','2024','12','31','2024-12-31 06:49:12','2024-12-31 06:49:12'),(92,'127.0.0.1','2025','01','02','2025-01-02 05:47:31','2025-01-02 05:47:31'),(93,'127.0.0.1','2025','01','06','2025-01-06 12:03:58','2025-01-06 12:03:58');
/*!40000 ALTER TABLE `visits` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-06 16:09:18
