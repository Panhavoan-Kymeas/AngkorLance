# AnkorLance GitHub Labels and Issue Mapping

This Markdown lists recommended labels and suggested user story-to-feature mapping for the AnkorLance MVP GitHub Project.

## 1️⃣ Feature / Epic Labels
| Label | Color | Purpose |
|-------|-------|---------|
| `feature/auth` | `#1E90FF` | Authentication & User Management |
| `feature/job` | `#32CD32` | Job Management (Client) |
| `feature/browse` | `#FF8C00` | Job Browsing / Filtering (Freelancer) |
| `feature/proposal` | `#8A2BE2` | Proposal Management |
| `feature/dashboard` | `#00CED1` | Freelancer Dashboard |
| `feature/image` | `#FF1493` | Image Management |
| `feature/lifecycle` | `#FFD700` | Job Lifecycle / Status Transitions |

## 2️⃣ Priority Labels
| Label | Color | Purpose |
|-------|-------|---------|
| `priority/high` | `#FF4500` | Must implement in MVP |
| `priority/medium` | `#FFA500` | Nice to have for MVP |
| `priority/low` | `#9ACD32` | Optional / future feature |

## 3️⃣ Type Labels
| Label | Color | Purpose |
|-------|-------|---------|
| `type/story` | `#1E90FF` | Standard User Story |
| `type/bug` | `#DC143C` | Bug or defect |
| `type/task` | `#696969` | Technical task / backend setup |
| `type/research` | `#8B4513` | Spike / research task |

## 4️⃣ Status Labels (Optional)
| Label | Color | Purpose |
|-------|-------|---------|
| `status/backlog` | `#D3D3D3` | Story not started |
| `status/in-progress` | `#00BFFF` | Story in progress |
| `status/review` | `#FFD700` | QA / code review |
| `status/done` | `#32CD32` | Completed |

## 5️⃣ User Story to Feature Mapping
| User Story | Feature | Suggested Labels |
|------------|--------|-----------------|
| US-001: User Registration | Authentication | `feature/auth`, `priority/high`, `type/story` |
| US-002: User Login | Authentication | `feature/auth`, `priority/high`, `type/story` |
| US-003: Role-Based Access | Authentication | `feature/auth`, `priority/high`, `type/story` |
| US-004: Create Job Post | Job Management | `feature/job`, `priority/high`, `type/story` |
| US-005: View Own Job Posts | Job Management | `feature/job`, `priority/high`, `type/story` |
| US-006: Update/Delete Job Post | Job Management | `feature/job`, `priority/high`, `type/story` |
| US-007: Browse OPEN Jobs | Job Browsing | `feature/browse`, `priority/high`, `type/story` |
| US-008: Filter Jobs by Category | Job Browsing | `feature/browse`, `priority/medium`, `type/story` |
| US-009: Submit Proposal | Proposal Management | `feature/proposal`, `priority/high`, `type/story` |
| US-010: View Proposals | Proposal Management | `feature/proposal`, `priority/high`, `type/story` |
| US-011: Accept Proposal | Proposal Management / Lifecycle | `feature/proposal`, `feature/lifecycle`, `priority/high`, `type/story` |
| US-012: Complete Job | Job Lifecycle | `feature/lifecycle`, `priority/high`, `type/story` |
| US-013: Freelancer Dashboard | Dashboard | `feature/dashboard`, `priority/high`, `type/story` |
| US-014: Upload Profile Image | Image Management | `feature/image`, `priority/medium`, `type/story` |
| US-015: Upload Job Image | Image Management | `feature/image`, `priority/medium`, `type/story` |

---

💡 **Tips:**
- Apply **feature** and **priority** labels to all user stories.
- Use **type** labels for clarity.
- Optional **status labels** can supplement board columns for filtering.
- This table can be used directly for **creating GitHub Issues** and linking to Epics.