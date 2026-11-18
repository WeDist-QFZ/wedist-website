export const ROUTE = "/storagecalc"

export const SEO_TITLE =
  "MOI Qatar CCTV DSA Report Generator & Storage Calculator"

export const SEO_DESCRIPTION =
  "Generate an MOI Qatar DSA-ready CCTV storage calculation report online. Use the free storage calculator to size RAID 5/6, NVR and JBOD capacity, then export a PDF. Not an official MOI form."

export const SEO_KEYWORDS = [
  "CCTV storage calculator Qatar",
  "MOI DSA report generator",
  "CCTV report",
  "DSA report online generator",
  "MOI Qatar CCTV report",
  "storage calculator",
  "MOI Qatar storage calculation",
  "DSA document MOI Qatar",
  "Design Stage Assessment CCTV",
  "MOI SSD CCTV requirements",
  "SSD approval CCTV Qatar",
  "120 days CCTV recording Qatar",
  "ELV projects Qatar",
  "NVR storage calculation",
  "RAID 5 RAID 6 calculator",
  "JBOD storage sizing",
  "failover recording server storage",
  "surveillance storage calculator",
  "video surveillance storage Doha",
]

export interface Faq {
  q: string
  a: string
}

export const FAQS: Faq[] = [
  {
    q: "Can I generate an MOI Qatar CCTV DSA report online?",
    a: "This online CCTV storage calculator generates a DSA-ready storage calculation PDF for MOI Qatar project submissions. It covers storage sizing and is not a complete DSA submission or an official MOI form.",
  },
  {
    q: "What is a DSA for CCTV in Qatar?",
    a: "DSA (Design Stage Assessment) is the design-approval stage of the Ministry of Interior Security Systems Department (MOI SSD) process for security systems in Qatar. The contractor submits the CCTV design package - drawings, camera schedule, equipment data and the CCTV storage calculation - for review before installation and the later site inspection.",
  },
  {
    q: "How many days of CCTV recording does MOI Qatar require?",
    a: "The standard requirement for premises regulated under Qatar Law No. 9 of 2011 and the MOI SSD guidelines is 120 days of continuous 24/7 recording, which is this calculator's default primary retention. Failover (FOS) storage is often sized for a shorter period - set the failover retention to match your approved design, and always confirm against the latest SSD requirements for your project category.",
  },
  {
    q: "How does the calculator size storage per camera?",
    a: "It is calibrated to 3.1 TiB per camera for 120 days at 2.5 Mbps (continuous recording, including roughly 5% file-system and metadata overhead) and scales linearly with each camera set's bitrate and the retention days. Different camera sets in the same project can have different bitrates.",
  },
  {
    q: "Why does the report show TiB for available storage but TB for proposed storage?",
    a: "Drives are sold in decimal terabytes (1 TB = 10^12 bytes) while operating systems and VMS platforms report binary tebibytes (1 TiB = 2^40 bytes). A 22 TB drive gives about 20.01 TiB. Required and available storage are shown in TiB so they compare like-for-like; proposed storage is the installed drive capacity in TB.",
  },
  {
    q: "Should I use RAID 5 or RAID 6 for an MOI-compliant Projects?",
    a: "RAID 5 is widely used and gives one drive of protection per array. With large 16 TB+ drives and wide arrays, rebuilds take a long time and a second failure during rebuild loses the array, so RAID 6 (two parity drives per array) is the safer choice. The calculator compares both and shows drives, efficiency and fault tolerance side by side.",
  },
  {
    q: "Can I plan a controller with several JBOD expansion units?",
    a: "Yes. Each storage set is one controller (NVR, storage server or SAN head) with any number of JBODs chained to it, and you can add as many independent sets as you need for primary and for failover recording. A JBOD always belongs to a controller, and every set is planned and drawn on its own in the exported report.",
  },
  {
    q: "Is the exported PDF an official MOI form?",
    a: "No. It follows the storage calculation sheet layout commonly submitted with CCTV DSA packages in Qatar (project details, per-server disk pool / array table, primary and failover summaries) and adds a drive-bay layout. Review it and check the current MOI SSD submission requirements before you submit.",
  },
]
