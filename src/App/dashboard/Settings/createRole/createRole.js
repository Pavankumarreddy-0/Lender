import React, { useState } from "react";
import { set, get, isEqual, create } from "lodash";
import { Link } from "react-router-dom";
import createRoleStyle from "./createRole.module.css";
import Accordion from "react-bootstrap/Accordion";

export default function CreateRole() {
  const [createRole, setCreateRole] = useState({
    roleName: "",
    pages: {
      dashboard: true,
      platform: true,
      crowdFunding: true,
      community: true,
      everything: true,
      investment: true,
    },
    permissions: {
      ActivityLogs: 0,
      AppropriatenessStatuses: 0,
      Appropriatenesstestresult: 0,
      Appropriatenesstestversion: 0,
      Appropriatenesstest: 0,
      Autoinvestmentsassignments: 0,
      Autoinvestmentssettings: 0,
      Commentsettings: 0,
      Comments: 0,
      Companymember: 0,
      Customfields: 0,
      Dashboard: 0,
      DealRooms: 0,
      Secondarymarketdeals: 0,
      Feessettings: 0,
      Fundinground: 0,
      HttpLogs: 0,
      IndicatedInterests: 0,
      Investments: 0,
      InvestorCategories: 0,
      InvestorCategoryStatements: 0,
      InvestorCategoryVersions: 0,
      Localization: 0,
      Modulesactivationsettings: 0,
      Modules: 0,
      Notificationmessages: 0,
      Notificationtemplates: 0,
      Notificationtriggers: 0,
      OfferingAgreements: 0,
      Offerings: 0,
      Organizationcapitalizationsetting: 0,
      Organizations: 0,
      PaymentSessions: 0,
      Payouts: 0,
      Accesspolicies: 0,
      Platformagreementstatements: 0,
      Platformagreements: 0,
      Accessroles: 0,
      Settings: 0,
      Shareholdings: 0,
      Siterequests: 0,
      System: 0,
      WebAppthemes: 0,
      Transactions: 0,
      TranslatedStrings: 0,
      Translations: 0,
      "Two-factorauthentication2FAsettings": 0,
      Users: 0,
      Wallets: 0,
      WebappMenus: 0,
    },
    privilages: {
      ActivityLogs: {
        sectionName: "Activity Logs",

        childrens: [
          { privilageName: "View activity logs", privilageComparator: 2 },
        ],
      },
      AppropriatenessStatuses: {
        sectionName: "Appropriateness Statuses",

        childrens: [
          {
            privilageName: "Change customer appropriateness test status",
            privilageComparator: 2,
          },
        ],
      },
      Appropriatenesstestresult: {
        sectionName: "Appropriateness test result",

        childrens: [
          {
            privilageName: "View customer test result",
            privilageComparator: 2,
          },
          { privilageName: "View test log", privilageComparator: 4 },
        ],
      },
      Appropriatenesstestversion: {
        sectionName: "Appropriateness test version",

        childrens: [
          {
            privilageName:
              "Update appropriateness test questions list and test config",
            privilageComparator: 2,
          },
        ],
      },
      Appropriatenesstest: {
        sectionName: "Appropriateness test",

        childrens: [
          {
            privilageName: "Create appropriateness test",
            privilageComparator: 2,
          },
          {
            privilageName: "Appropriateness test messages and status update",
            privilageComparator: 4,
          },
          {
            privilageName: "View appropriateness test details",
            privilageComparator: 8,
          },
          { privilageName: "View all tests", privilageComparator: 16 },
        ],
      },
      Autoinvestmentsassignments: {
        sectionName: "Auto investments assignments",

        childrens: [
          { privilageName: "Create assignment", privilageComparator: 2 },
          { privilageName: "Update assignment", privilageComparator: 4 },
          {
            privilageName: "View auto investment assignments",
            privilageComparator: 8,
          },
        ],
      },
      Autoinvestmentssettings: {
        sectionName: "Auto investments settings",

        childrens: [
          { privilageName: "Update settings", privilageComparator: 2 },
          { privilageName: "View settings", privilageComparator: 4 },
        ],
      },
      Commentsettings: {
        sectionName: "Comment settings",

        childrens: [
          { privilageName: "Update settings", privilageComparator: 2 },
          { privilageName: "View settings", privilageComparator: 4 },
        ],
      },
      Comments: {
        sectionName: "Comments",

        childrens: [
          { privilageName: "View comments list", privilageComparator: 2 },
        ],
      },
      Companymember: {
        sectionName: "Company member",

        childrens: [
          { privilageName: "Create company member", privilageComparator: 2 },
          { privilageName: "Update company member", privilageComparator: 4 },
          { privilageName: "Delete company member", privilageComparator: 8 },
        ],
      },
      Customfields: {
        sectionName: "Custom fields",

        childrens: [
          { privilageName: "Create custom field", privilageComparator: 2 },
          { privilageName: "Update custom field", privilageComparator: 4 },
          { privilageName: "Delete custom field", privilageComparator: 8 },
          { privilageName: "View custom fields page", privilageComparator: 16 },
        ],
      },
      Dashboard: {
        sectionName: "Dashboard",

        childrens: [
          {
            privilageName: "View admin dashboard page",
            privilageComparator: 2,
          },
          { privilageName: "View investments chart", privilageComparator: 4 },
          { privilageName: "View registrations chart", privilageComparator: 8 },
          {
            privilageName: "View customers by status chart",
            privilageComparator: 16,
          },
          {
            privilageName: "View customers by role chart",
            privilageComparator: 32,
          },
          {
            privilageName: "View offerings by capital type chart",
            privilageComparator: 64,
          },
          {
            privilageName: "View offerings by status performance chart",
            privilageComparator: 128,
          },
          {
            privilageName: "View offerings by status chart",
            privilageComparator: 256,
          },
          {
            privilageName: "View average investment chart",
            privilageComparator: 512,
          },
          {
            privilageName: "View investments number chart",
            privilageComparator: 1024,
          },
          {
            privilageName: "View investments number metric",
            privilageComparator: 2048,
          },
          {
            privilageName: "View pending investments number metric",
            privilageComparator: 4096,
          },
          {
            privilageName: "View today invested metric",
            privilageComparator: 8192,
          },
          {
            privilageName: "View total invested metric",
            privilageComparator: 16384,
          },
          {
            privilageName: "View total platform fees metric",
            privilageComparator: 32768,
          },
          {
            privilageName: "View total repaid metric",
            privilageComparator: 65536,
          },
          {
            privilageName: "View repayments chart",
            privilageComparator: 131072,
          },
          {
            privilageName: "View total donation amount metric",
            privilageComparator: 262144,
          },
          {
            privilageName: "View total dividends paid metric",
            privilageComparator: 524288,
          },
          {
            privilageName: "View total shares metric",
            privilageComparator: 1048576,
          },
          {
            privilageName: "View company investors balance metric",
            privilageComparator: 2097152,
          },
          {
            privilageName: "View individual investors balance metric",
            privilageComparator: 4194304,
          },
          {
            privilageName: "View total available investor balance metric",
            privilageComparator: 8388608,
          },
          {
            privilageName: "View investors by category chart",
            privilageComparator: 16777216,
          },
        ],
      },
      DealRooms: {
        sectionName: "Deal Rooms",

        childrens: [
          { privilageName: "Add deal room comment", privilageComparator: 2 },
          { privilageName: "Update deal room comment", privilageComparator: 4 },
          { privilageName: "Add deal room document", privilageComparator: 8 },
          {
            privilageName: "Update deal room document",
            privilageComparator: 16,
          },
          {
            privilageName: "Delete deal room document",
            privilageComparator: 32,
          },
        ],
      },
      Secondarymarketdeals: {
        sectionName: "Secondary market deals",

        childrens: [
          { privilageName: "Create deal", privilageComparator: 2 },
          { privilageName: "Update deal", privilageComparator: 4 },
          { privilageName: "View all deals", privilageComparator: 8 },
          { privilageName: "View debt deals", privilageComparator: 16 },
          { privilageName: "View equity deals", privilageComparator: 32 },
        ],
      },
      Feessettings: {
        sectionName: "Fees settings",

        childrens: [
          { privilageName: "Update settings", privilageComparator: 2 },
          { privilageName: "View settings", privilageComparator: 4 },
        ],
      },
      Fundinground: {
        sectionName: "Funding round",

        childrens: [
          { privilageName: "Create funding round", privilageComparator: 2 },
          { privilageName: "Update funding round", privilageComparator: 4 },
          { privilageName: "Delete funding round", privilageComparator: 8 },
        ],
      },
      HttpLogs: {
        sectionName: "Http Logs",

        childrens: [
          { privilageName: "View inbound HTTP logs", privilageComparator: 2 },
          { privilageName: "View outbound HTTP logs", privilageComparator: 4 },
        ],
      },
      IndicatedInterests: {
        sectionName: "Indicated Interests",

        childrens: [
          {
            privilageName: "Indicate interest in offering",
            privilageComparator: 2,
          },
          {
            privilageName: "Delete indicated interest",
            privilageComparator: 4,
          },
          {
            privilageName: "View indicated interests by offering",
            privilageComparator: 8,
          },
          {
            privilageName: "View indicated interests by user",
            privilageComparator: 16,
          },
        ],
      },
      Investments: {
        sectionName: "Investments",

        childrens: [
          { privilageName: "Create investment", privilageComparator: 2 },
          { privilageName: "Update investment", privilageComparator: 4 },
          {
            privilageName: "View auto investments list",
            privilageComparator: 8,
          },
          { privilageName: "Add investment document", privilageComparator: 16 },
          {
            privilageName: "Update investment document",
            privilageComparator: 32,
          },
          {
            privilageName: "Delete investment document",
            privilageComparator: 64,
          },
          {
            privilageName: "View investment documents",
            privilageComparator: 128,
          },
          { privilageName: "View all investments", privilageComparator: 256 },
          {
            privilageName: "View exceeded annual limit investments",
            privilageComparator: 512,
          },
          {
            privilageName: "View debt investments list",
            privilageComparator: 1024,
          },
          {
            privilageName: "View donation investments",
            privilageComparator: 2048,
          },
          {
            privilageName: "View equity investments",
            privilageComparator: 4096,
          },
          {
            privilageName: "View investment details",
            privilageComparator: 8192,
          },
          {
            privilageName: "View investment history",
            privilageComparator: 16384,
          },
        ],
      },
      InvestorCategories: {
        sectionName: "Investor Categories",

        childrens: [
          {
            privilageName: "Create or update investor category",
            privilageComparator: 2,
          },
          {
            privilageName: "View all investor categories",
            privilageComparator: 4,
          },
          {
            privilageName: "View investor category and its versions",
            privilageComparator: 8,
          },
        ],
      },
      InvestorCategoryStatements: {
        sectionName: "Investor Category Statements",

        childrens: [
          {
            privilageName: "Update investor category statement",
            privilageComparator: 2,
          },
        ],
      },
      InvestorCategoryVersions: {
        sectionName: "Investor Category Versions",

        childrens: [
          {
            privilageName: "Activate outdated category version",
            privilageComparator: 2,
          },
        ],
      },
      Localization: {
        sectionName: "Localization",

        childrens: [
          { privilageName: "Update languages", privilageComparator: 2 },
          { privilageName: "View languages", privilageComparator: 4 },
        ],
      },
      Modulesactivationsettings: {
        sectionName: "Modules activation settings",

        childrens: [
          {
            privilageName: "Update DocuSign activation settings",
            privilageComparator: 2,
          },
          {
            privilageName:
              "Update WebApp Google Tag Manager activation settings",
            privilageComparator: 4,
          },
          {
            privilageName: "Update Hello Sign activation settings",
            privilageComparator: 8,
          },
          {
            privilageName: "Update Investor categorization activation settings",
            privilageComparator: 16,
          },
          {
            privilageName: "Update Jumio activation settings",
            privilageComparator: 32,
          },
          {
            privilageName: "Update Lemonway activation settings",
            privilageComparator: 64,
          },
          {
            privilageName: "Update Mangopay activation settings",
            privilageComparator: 128,
          },
          {
            privilageName: "Update MinIO activation settings",
            privilageComparator: 256,
          },
          {
            privilageName: "Update EU regulation activation settings",
            privilageComparator: 512,
          },
          {
            privilageName: "Update USA regulation activation settings",
            privilageComparator: 1024,
          },
          {
            privilageName: "Update Sentry activation settings",
            privilageComparator: 2048,
          },
          {
            privilageName: "Update Slack activation settings",
            privilageComparator: 4096,
          },
          {
            privilageName: "Update Twilio activation settings",
            privilageComparator: 8192,
          },
          {
            privilageName: "Update platform social auth settings",
            privilageComparator: 16384,
          },
          {
            privilageName: "Update WebPush activation settings",
            privilageComparator: 32768,
          },
          { privilageName: "Update AWS settings", privilageComparator: 65536 },
          {
            privilageName: "Update S3 cloud storage settings",
            privilageComparator: 131072,
          },
          {
            privilageName: "Update AWS Translate integration settings",
            privilageComparator: 262144,
          },
          {
            privilageName: "Update platform agreement settings",
            privilageComparator: 524288,
          },
          {
            privilageName: "Update Offering CMS settings",
            privilageComparator: 1048576,
          },
          {
            privilageName: "Update Google autocomplete places settings",
            privilageComparator: 2097152,
          },
          {
            privilageName: "Update Google Recaptcha settings",
            privilageComparator: 4194304,
          },
          {
            privilageName: "Update Auth0 settings",
            privilageComparator: 8388608,
          },
          {
            privilageName: "Update WebApp menu settings",
            privilageComparator: 16777216,
          },
          {
            privilageName: "Update North Capital activation settings",
            privilageComparator: 33554432,
          },
          {
            privilageName: "Update System bank payment configuration",
            privilageComparator: 67108864,
          },
        ],
      },
      Modules: {
        sectionName: "Modules",

        childrens: [
          { privilageName: "Enable/Disable modules", privilageComparator: 2 },
          { privilageName: "View modules", privilageComparator: 4 },
        ],
      },
      Notificationmessages: {
        sectionName: "Notification messages",

        childrens: [
          {
            privilageName: "Update notification message",
            privilageComparator: 2,
          },
        ],
      },
      Notificationtemplates: {
        sectionName: "Notification templates",

        childrens: [
          {
            privilageName: "Create notification template",
            privilageComparator: 2,
          },
          {
            privilageName: "Update notification template",
            privilageComparator: 4,
          },
          {
            privilageName: "Delete notification template",
            privilageComparator: 8,
          },
          {
            privilageName: "View notification template details",
            privilageComparator: 16,
          },
          {
            privilageName: "View the list of notification templates",
            privilageComparator: 32,
          },
        ],
      },
      Notificationtriggers: {
        sectionName: "Notification triggers",

        childrens: [
          {
            privilageName: "Update notification trigger",
            privilageComparator: 2,
          },
          {
            privilageName: "Create admins notifications",
            privilageComparator: 4,
          },
          {
            privilageName: "Update role notification subscriptions",
            privilageComparator: 8,
          },
          {
            privilageName:
              "View list of back office users notification triggers",
            privilageComparator: 16,
          },
          {
            privilageName: "View list of community users notification triggers",
            privilageComparator: 32,
          },
          {
            privilageName: "View list of fundraiser notification triggers",
            privilageComparator: 64,
          },
          {
            privilageName: "View list of investor notification triggers",
            privilageComparator: 128,
          },
          {
            privilageName: "View list of system notification triggers",
            privilageComparator: 256,
          },
          {
            privilageName: "View notification trigger details",
            privilageComparator: 512,
          },
        ],
      },
      OfferingAgreements: {
        sectionName: "Offering Agreements",

        childrens: [
          {
            privilageName:
              "Create or update offering agreement and its versions",
            privilageComparator: 2,
          },
          {
            privilageName: "View Offering Agreements list",
            privilageComparator: 4,
          },
          {
            privilageName: "View Offering Agreement version details",
            privilageComparator: 8,
          },
        ],
      },
      Offerings: {
        sectionName: "Offerings",

        childrens: [
          { privilageName: "Update offering status", privilageComparator: 2 },
          { privilageName: "Create offering", privilageComparator: 4 },
          { privilageName: "Update offering", privilageComparator: 8 },
          {
            privilageName: "View active crowdfundings list",
            privilageComparator: 16,
          },
          {
            privilageName: "View success crowdfundings list",
            privilageComparator: 32,
          },
          {
            privilageName: "View failed crowdfundings list",
            privilageComparator: 64,
          },
          {
            privilageName: "View overdue payments offerings list",
            privilageComparator: 128,
          },
          {
            privilageName: "View offerings followers",
            privilageComparator: 256,
          },
          {
            privilageName: "Export offerings sitemap.xml to the web app",
            privilageComparator: 512,
          },
          {
            privilageName: "View auto investment suggestions list",
            privilageComparator: 1024,
          },
          { privilageName: "Add offering address", privilageComparator: 2048 },
          {
            privilageName: "Update offering address",
            privilageComparator: 4096,
          },
          {
            privilageName: "Delete offering address",
            privilageComparator: 8192,
          },
          {
            privilageName: "View offering address",
            privilageComparator: 16384,
          },
          {
            privilageName: "Create offering payment destination bank account.",
            privilageComparator: 32768,
          },
          {
            privilageName: "Update offering payment destination bank account.",
            privilageComparator: 65536,
          },
          {
            privilageName: "Delete offering payment destination bank account.",
            privilageComparator: 131072,
          },
          { privilageName: "Create comment", privilageComparator: 262144 },
          { privilageName: "Update comment", privilageComparator: 524288 },
          { privilageName: "Delete comment", privilageComparator: 1048576 },
          { privilageName: "View Deal Room", privilageComparator: 2097152 },
          {
            privilageName: "Add offering document",
            privilageComparator: 4194304,
          },
          {
            privilageName: "Update offering document",
            privilageComparator: 8388608,
          },
          {
            privilageName: "Delete offering document",
            privilageComparator: 16777216,
          },
          {
            privilageName: "View offering documents",
            privilageComparator: 33554432,
          },
          {
            privilageName: "Upload offering image",
            privilageComparator: 67108864,
          },
          {
            privilageName: "Update offering image information",
            privilageComparator: 134217728,
          },
          {
            privilageName: "Delete offering image",
            privilageComparator: 268435456,
          },
          {
            privilageName: "View offering images",
            privilageComparator: 536870912,
          },
          {
            privilageName: "Manage offering tags",
            privilageComparator: 1073741824,
          },
          {
            privilageName: "View offering tags",
            privilageComparator: 2147483648,
          },
          {
            privilageName: "View all offerings",
            privilageComparator: 4294967296,
          },
          {
            privilageName: "View Authorized auditors offering list",
            privilageComparator: 8589934592,
          },
          {
            privilageName: "View debt offerings list",
            privilageComparator: 17179869184,
          },
          {
            privilageName: "View donation offerings",
            privilageComparator: 34359738368,
          },
          {
            privilageName: "View equity offerings",
            privilageComparator: 68719476736,
          },
          {
            privilageName: "View offering details",
            privilageComparator: 137438953472,
          },
          {
            privilageName: "View offering history",
            privilageComparator: 274877906944,
          },
          {
            privilageName: "View offering payment destination bank accounts",
            privilageComparator: 549755813888,
          },
          {
            privilageName: "View offering SEO",
            privilageComparator: 1099511627776,
          },
          { privilageName: "Offering submitted", privilageComparator: 2 },
          {
            privilageName: "Offering before 1 day closing",
            privilageComparator: 4,
          },
          {
            privilageName: "Offerings crowdfunding campaign not started",
            privilageComparator: 8,
          },
        ],
      },
      Organizationcapitalizationsetting: {
        sectionName: "Organization capitalization setting",

        childrens: [
          {
            privilageName: "Update organization capitalization setting",
            privilageComparator: 2,
          },
        ],
      },
      Organizations: {
        sectionName: "Organizations",

        childrens: [
          { privilageName: "Create organization", privilageComparator: 2 },
          { privilageName: "Update organization", privilageComparator: 4 },
          {
            privilageName: "View investing offerings list",
            privilageComparator: 8,
          },
          {
            privilageName: "View fundraising offerings list",
            privilageComparator: 16,
          },
          { privilageName: "View followed offerings", privilageComparator: 32 },
          {
            privilageName: "Add organization address",
            privilageComparator: 64,
          },
          {
            privilageName: "Update organization address",
            privilageComparator: 128,
          },
          {
            privilageName: "Delete organization address",
            privilageComparator: 256,
          },
          {
            privilageName: "View organization addresses",
            privilageComparator: 512,
          },
          {
            privilageName: "Create organization bank account",
            privilageComparator: 1024,
          },
          {
            privilageName: "Update organization bank account",
            privilageComparator: 2048,
          },
          {
            privilageName: "Delete organization bank account",
            privilageComparator: 4096,
          },
          {
            privilageName:
              "Create organization payment destination bank account.",
            privilageComparator: 8192,
          },
          {
            privilageName:
              "Update organization payment destination bank account.",
            privilageComparator: 16384,
          },
          {
            privilageName:
              "Delete organization payment destination bank account.",
            privilageComparator: 32768,
          },
          {
            privilageName: "View organization company members",
            privilageComparator: 65536,
          },
          {
            privilageName: "Add organization document",
            privilageComparator: 131072,
          },
          {
            privilageName: "Update organization document",
            privilageComparator: 262144,
          },
          {
            privilageName: "Delete organization document",
            privilageComparator: 524288,
          },
          {
            privilageName: "View organization documents",
            privilageComparator: 1048576,
          },
          {
            privilageName: "Create kyc verification for organization",
            privilageComparator: 2097152,
          },
          {
            privilageName: "Update kyc verification for organization",
            privilageComparator: 4194304,
          },
          {
            privilageName: "View kyc verification for organization",
            privilageComparator: 8388608,
          },
          {
            privilageName: "Manage organization tags",
            privilageComparator: 16777216,
          },
          {
            privilageName: "View organization tags",
            privilageComparator: 33554432,
          },
          {
            privilageName: "View all organizations",
            privilageComparator: 67108864,
          },
          {
            privilageName: "View organization details",
            privilageComparator: 134217728,
          },
          {
            privilageName: "View organization billing info",
            privilageComparator: 268435456,
          },
          {
            privilageName: "View organization history",
            privilageComparator: 536870912,
          },
          {
            privilageName: "View organization capitalization tab",
            privilageComparator: 1073741824,
          },
        ],
      },
      PaymentSessions: {
        sectionName: "Payment Sessions",

        childrens: [
          {
            privilageName: "View payment sessions list",
            privilageComparator: 2,
          },
        ],
      },
      Payouts: {
        sectionName: "Payouts",

        childrens: [
          { privilageName: "Update payouts", privilageComparator: 2 },
          { privilageName: "View debt payouts list", privilageComparator: 4 },
          { privilageName: "View debt payout details", privilageComparator: 8 },
          {
            privilageName: "View equity payout details",
            privilageComparator: 16,
          },
          {
            privilageName: "View equity dividends list",
            privilageComparator: 32,
          },
        ],
      },
      Accesspolicies: {
        sectionName: "Access policies",

        childrens: [
          { privilageName: "Create policy", privilageComparator: 2 },
          { privilageName: "Update policy", privilageComparator: 4 },
          { privilageName: "View policies list", privilageComparator: 8 },
          { privilageName: "View policy details", privilageComparator: 16 },
        ],
      },
      Platformagreementstatements: {
        sectionName: "Platform agreement statements",

        childrens: [
          {
            privilageName: "Update Platform agreement statements",
            privilageComparator: 2,
          },
          {
            privilageName: "View Platform agreement statements list",
            privilageComparator: 4,
          },
        ],
      },
      Platformagreements: {
        sectionName: "Platform agreements",

        childrens: [
          {
            privilageName:
              "Create or update platform agreement and its versions",
            privilageComparator: 2,
          },
          {
            privilageName: "View Platform agreements list",
            privilageComparator: 4,
          },
          {
            privilageName: "View Platform agreement version details",
            privilageComparator: 8,
          },
        ],
      },
      Accessroles: {
        sectionName: "Access roles",

        childrens: [
          { privilageName: "Create role", privilageComparator: 2 },
          { privilageName: "Update role", privilageComparator: 4 },
          { privilageName: "View role details", privilageComparator: 8 },
          { privilageName: "View roles list", privilageComparator: 16 },
        ],
      },
      Settings: {
        sectionName: "Settings",

        childrens: [
          {
            privilageName: "Update platform general settings",
            privilageComparator: 2,
          },
          {
            privilageName: "Update platform dates settings",
            privilageComparator: 4,
          },
          {
            privilageName: "Update platform contacts settings",
            privilageComparator: 8,
          },
          {
            privilageName: "Update platform socials settings",
            privilageComparator: 16,
          },
          {
            privilageName: "Update notification settings",
            privilageComparator: 32,
          },
          { privilageName: "Update robots.txt SEO", privilageComparator: 64 },
          {
            privilageName: "Update Platform branding settings",
            privilageComparator: 128,
          },
          { privilageName: "Update GDPR settings", privilageComparator: 256 },
          {
            privilageName: "Update quick registration settings",
            privilageComparator: 512,
          },
          {
            privilageName: "Update registration settings",
            privilageComparator: 1024,
          },
          {
            privilageName: "View Platform branding Settings",
            privilageComparator: 2048,
          },
          {
            privilageName: "View platform configurations page",
            privilageComparator: 4096,
          },
          { privilageName: "View GDPR Settings", privilageComparator: 8192 },
          { privilageName: "View robots.txt SEO", privilageComparator: 16384 },
        ],
      },
      Shareholdings: {
        sectionName: "Shareholdings",

        childrens: [
          { privilageName: "Manage shareholdings", privilageComparator: 2 },
        ],
      },
      Siterequests: {
        sectionName: "Site requests",

        childrens: [
          { privilageName: "View site requests", privilageComparator: 2 },
        ],
      },
      System: {
        sectionName: "System",

        childrens: [
          {
            privilageName: "View platform license details",
            privilageComparator: 2,
          },
          {
            privilageName: "Maintain database privileges configuration",
            privilageComparator: 4,
          },
          {
            privilageName: "View system database status",
            privilageComparator: 8,
          },
        ],
      },
      WebAppthemes: {
        sectionName: "WebApp themes",

        childrens: [
          { privilageName: "Activate or update theme", privilageComparator: 2 },
          { privilageName: "View themes list", privilageComparator: 4 },
          { privilageName: "View theme preview", privilageComparator: 8 },
        ],
      },
      Transactions: {
        sectionName: "Transactions",

        childrens: [
          { privilageName: "Create transaction", privilageComparator: 2 },
          { privilageName: "Update transaction", privilageComparator: 4 },
          { privilageName: "View all transactions", privilageComparator: 8 },
          {
            privilageName: "View transaction details",
            privilageComparator: 16,
          },
          {
            privilageName: "View transaction history",
            privilageComparator: 32,
          },
          {
            privilageName: "Dividends has been paid successfully",
            privilageComparator: 2,
          },
          { privilageName: "Payment confirmation", privilageComparator: 4 },
        ],
      },
      TranslatedStrings: {
        sectionName: "Translated Strings",

        childrens: [
          {
            privilageName: "Reset WebApp translations",
            privilageComparator: 2,
          },
        ],
      },
      Translations: {
        sectionName: "Translations",

        childrens: [
          { privilageName: "Update translation", privilageComparator: 2 },
          { privilageName: "Scan WebApp translations", privilageComparator: 4 },
          { privilageName: "Translate automatically", privilageComparator: 8 },
          { privilageName: "View translations", privilageComparator: 16 },
          {
            privilageName: "Import/export translations",
            privilageComparator: 32,
          },
        ],
      },
      "Two-factorauthentication2FAsettings": {
        sectionName: "Two-factor authentication (2FA) settings",

        childrens: [
          { privilageName: "Update 2FA settings", privilageComparator: 2 },
          { privilageName: "View 2FA settings", privilageComparator: 4 },
        ],
      },
      Users: {
        sectionName: "Users",

        childrens: [
          { privilageName: "Create user", privilageComparator: 2 },
          { privilageName: "Update user", privilageComparator: 4 },
          { privilageName: "Create back office user", privilageComparator: 8 },
          { privilageName: "Update back office user", privilageComparator: 16 },
          {
            privilageName: "Revoke back office users sessions",
            privilageComparator: 32,
          },
          {
            privilageName: "Disable 2FA on customer behalf.",
            privilageComparator: 64,
          },
          {
            privilageName: "View individual investors list",
            privilageComparator: 128,
          },
          {
            privilageName: "View legal investors list",
            privilageComparator: 256,
          },
          {
            privilageName: "View individual fundraisers list",
            privilageComparator: 512,
          },
          {
            privilageName: "View legal fundraisers list",
            privilageComparator: 1024,
          },
          {
            privilageName: "View followed offerings",
            privilageComparator: 2048,
          },
          { privilageName: "Emulate user profile", privilageComparator: 4096 },
          { privilageName: "Add user address", privilageComparator: 8192 },
          { privilageName: "Update user address", privilageComparator: 16384 },
          { privilageName: "Delete user address", privilageComparator: 32768 },
          { privilageName: "View user addresses", privilageComparator: 65536 },
          {
            privilageName: "Create user bank account",
            privilageComparator: 131072,
          },
          {
            privilageName: "Update user bank account",
            privilageComparator: 262144,
          },
          {
            privilageName: "Delete user bank account",
            privilageComparator: 524288,
          },
          {
            privilageName: "Create user payment destination bank account.",
            privilageComparator: 1048576,
          },
          {
            privilageName: "Update user payment destination bank account.",
            privilageComparator: 2097152,
          },
          {
            privilageName: "Delete user payment destination bank account.",
            privilageComparator: 4194304,
          },
          {
            privilageName: "Update assigned Offerings for Authorized auditor",
            privilageComparator: 8388608,
          },
          { privilageName: "Add user document", privilageComparator: 16777216 },
          {
            privilageName: "Update user document",
            privilageComparator: 33554432,
          },
          {
            privilageName: "Delete user document",
            privilageComparator: 67108864,
          },
          {
            privilageName: "View user documents",
            privilageComparator: 134217728,
          },
          {
            privilageName: "Update GDPR requests to delete account",
            privilageComparator: 268435456,
          },
          {
            privilageName: "Create kyc verification for user",
            privilageComparator: 536870912,
          },
          {
            privilageName: "Update kyc verification for user",
            privilageComparator: 1073741824,
          },
          {
            privilageName: "View kyc verification for user",
            privilageComparator: 2147483648,
          },
          {
            privilageName: "Manage back office user permissions",
            privilageComparator: 4294967296,
          },
          {
            privilageName: "Manage back office user roles",
            privilageComparator: 8589934592,
          },
          {
            privilageName: "Manage user tags",
            privilageComparator: 17179869184,
          },
          { privilageName: "View user tags", privilageComparator: 34359738368 },
          {
            privilageName: "View user sessions",
            privilageComparator: 68719476736,
          },
          {
            privilageName: "View back office user details",
            privilageComparator: 137438953472,
          },
          {
            privilageName: "View own personal history log",
            privilageComparator: 274877906944,
          },
          {
            privilageName: "View tab with assigned offerings",
            privilageComparator: 549755813888,
          },
          {
            privilageName: "View back office users sessions",
            privilageComparator: 1099511627776,
          },
          {
            privilageName: "View back office users list",
            privilageComparator: 2199023255552,
          },
          {
            privilageName: "View all users",
            privilageComparator: 4398046511104,
          },
          {
            privilageName: "View Authorized auditors list",
            privilageComparator: 8796093022208,
          },
          {
            privilageName: "View GDPR requests to delete account",
            privilageComparator: 17592186044416,
          },
          {
            privilageName: "View referral users",
            privilageComparator: 35184372088832,
          },
          {
            privilageName: "View registration requests",
            privilageComparator: 70368744177664,
          },
          {
            privilageName: "View user details",
            privilageComparator: 140737488355328,
          },
          {
            privilageName: "View user billing info",
            privilageComparator: 281474976710656,
          },
          {
            privilageName: "View user history",
            privilageComparator: 562949953421312,
          },
          { privilageName: "User KYC blocked", privilageComparator: 2 },
          {
            privilageName: "GDPR delete account request processing failed",
            privilageComparator: 4,
          },
          { privilageName: "New registration request", privilageComparator: 8 },
          {
            privilageName: "GDPR delete account request created",
            privilageComparator: 16,
          },
        ],
      },
      Wallets: {
        sectionName: "Wallets",

        childrens: [
          {
            privilageName: "Create system bank account",
            privilageComparator: 2,
          },
          {
            privilageName: "Update system bank account",
            privilageComparator: 4,
          },
          {
            privilageName: "Delete system bank account",
            privilageComparator: 8,
          },
          { privilageName: "View all wallets list", privilageComparator: 16 },
          { privilageName: "View platform finance", privilageComparator: 32 },
          {
            privilageName: "View wallet details page",
            privilageComparator: 64,
          },
        ],
      },
      WebappMenus: {
        sectionName: "Webapp Menus",

        childrens: [
          { privilageName: "Manage WebApp menus", privilageComparator: 2 },
        ],
      },
    },
  });

  const generateAccess = (roles) => {
    let items = [];
    for (let role in roles) {
      items.push([role, roles[role]]);
    }

    return items;
  };

  const updateRole = (e) => {
    let ___prop = e.target.getAttribute("data-privilage");
    let formattingString = "pages." + ___prop;
    let newPropState = set(
      { ...createRole },
      formattingString,
      !get(createRole, formattingString)
    );
    setCreateRole(newPropState);
  };

  const updatePrivilage = (e) => {
    let __bit = +e.target.getAttribute("data-bit");
    let ___prop = e.target.getAttribute("data-privilage");
    let currentPrivilage = createRole.permissions[___prop];
    let newPrivilage = currentPrivilage ^ __bit;
    let formattingString = "permissions." + ___prop;
    // console.table(currentPrivilage.toString(2),__bit.toString(2),newPrivilage.toString(2))
    let newPropState = set({ ...createRole }, formattingString, newPrivilage);
    setCreateRole(newPropState);
  };

  return (
    <div className={createRoleStyle["createRoleModule"]}>
      <div className={createRoleStyle["CreateRolesHeaderContainer"]}>
        <div className={createRoleStyle["CreateRolesHeaderContainerRegion"]}>
          <Link
            className={createRoleStyle["CreateRolesHeaderContainerLink"]}
            to="/dashboard/settings"
          >
            <i className="bi bi-arrow-left"></i> Settings
          </Link>
          <p className={createRoleStyle["CreateRolesHeaderContainerName"]}>
            Roles Management
          </p>
        </div>
      </div>

      <section className={createRoleStyle["roleName__section"]}>
        <div className={createRoleStyle["roleName__section_inner"]}>
          <label className={createRoleStyle["roleName__label"]}>
            Role name:
          </label>
          <input
            className={createRoleStyle["roleName__input"]}
            type="text"
            onChange={(e) => {
              setCreateRole({ ...createRole, roleName: e.target.value });
            }}
          />
        </div>
      </section>

      <div className={createRoleStyle["role__permission"]}>
        <label className={createRoleStyle["role__accessibility__label"]}>
          Page accessibility:
        </label>
        <div className={createRoleStyle["checkbox__permission"]}>
          {generateAccess(createRole.pages).map((e,i) => {
            return (
              <div key={e[0] + "-" + i} className={createRoleStyle["checkbox__style"]}>
                <input
                  id={e[0]}
                  data-privilage={e[0]}
                  className="form-check-input"
                  onClick={(e) => {
                    updateRole(e);
                  }}
                  onChange={()=>{}}
                  value="createRole"
                  type="checkbox"
                  name={e[0]}
                  checked={e[1] ? "checked" : ""}
                />
                <label
                  className={createRoleStyle["checkbox__label"]}
                  htmlFor={e[0]}
                >
                  {e[0]}
                </label>
              </div>
            );
          })}
        </div>
        <div className={createRoleStyle["role_privilages"]}>
          <label className={createRoleStyle["role__permission__label"]}>
            Permissions:
          </label>
          <div className={createRoleStyle["role_privilages_inner"]}>
          
            {generateAccess(createRole.privilages).map((e) => {
              return (
                <Accordion key={e[0]} defaultActiveKey={e[0]}>
                  <Accordion.Item
                    className={createRoleStyle["role_privilage_section"]}
                    eventKey={e[0].sectionName}
                  >
                    <Accordion.Header
                      className={createRoleStyle["role_privilage_sectionTitle"]}
                    >
                      {e[1].sectionName}
                    </Accordion.Header>
                    <Accordion.Body
                      className={createRoleStyle["roleManagementAccordianBody"]}
                    >
                      {e[1].childrens.map((es,i) => {
                        return (
                          <div
                            key={e[0] + "-" + es.privilageComparator + "-" + i}
                            className={createRoleStyle["role_privilage_input"]}
                          >
                            <div className={createRoleStyle["checkbox__style"]}>
                              <input
                                id={e[0] + "-" + es.privilageName}
                                data-privilage={e[0]}
                                data-bit={es.privilageComparator}
                                className="form-check-input"
                                type="checkbox"
                                name={e[0].sectionName}
                                checked={
                                  (createRole.permissions[e[0]] &
                                    es.privilageComparator) ==
                                  es.privilageComparator
                                    ? "checked"
                                    : ""
                                }
                                onChange={()=>{}}
                                onClick={(e) => updatePrivilage(e)}
                              />
                              <label
                                className={createRoleStyle["checkbox__label"]}
                                htmlFor={e[0] + "-" + es.privilageName}
                              >
                                {es.privilageName}
                              </label>
                            </div>
                          </div>
                        );
                      })}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              );
            })}
            
          </div>
        </div>
        <div className={createRoleStyle["checkbox__button"]}>
          <button className={createRoleStyle["style__button"]}>
            <i className="bi bi-plus-circle"></i>Create Role
          </button>
        </div>
      </div>
    </div>
  );
}
