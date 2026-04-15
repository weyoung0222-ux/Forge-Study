# Collect activity — Teleoperation step button actions

Activity: **Data Collect** (workspace `collector`).  
Step 1 label: **Teleoperation**.  
Implementation reference: `CollectTeleoperationStepBlock` (`src/blocks/organisms/CollectTeleoperationStep.block.tsx`).

Prototype handlers may use `window.alert` or local state only; production should call the real teleoperation / episode / dataset APIs.

## Parameter column

| Control | Semantics (product) |
|--------|----------------------|
| **Apply** | Persist the current parameter form (robot model, task name, instruction mode, private mode, FPS, etc.) to the session or backend before running teleop. Does not advance the workflow step. |

## Episode progress bar (header)

- **Not** driven by the **Next** button or completed-episode count.
- Per **current episode**, a **maximum recording length in seconds** is defined (prototype: fixed 20s). The bar fills as **elapsed recording time / max seconds** while **Start → Stop** (or until the timer reaches the cap).
- Label examples: `Ready to Start 0 / 20 (s)` before recording; during recording show elapsed vs max, e.g. `7 / 20 (s)`.

## Teleoperation content area (bottom control bar)

| Button | Action |
|--------|--------|
| **Start** | Start recording **one episode** of teleoperation video and associated signals for the **current** episode index. Resets elapsed time for this take; clears **Save** until this take ends. |
| **Stop** | Stop the **in-progress** episode recording. Counts as “episode recording ended” → **Save** becomes enabled (prototype). |
| **Retry** | Discard the current take and reset elapsed time; **Save** disabled until another end condition. |
| **Next** | Move to the **next** episode index (increment). Clears **Save** until the new episode’s recording ends or **Finish** is used. |
| **Finish** | End the teleoperation session early. **Save** becomes enabled. |
| **Save** | Enabled when **Finish** was pressed **or** the current episode’s recording **ended** (stopped manually, or elapsed reached max seconds). Advances the work page to **step 2** (pre-processor). |

## Notes

- **Camera slots (+)** connect synchronized robot camera streams into each preview tile; prototype toggles connection state only. Layout: side tiles narrower, center tile wider (landscape aspect).
