import { folder, useControls } from "leva"
import { useEditor } from "../editable/useEditor"
import { tree } from "../editable/controls/tree/tree"

export function SceneTree() {
  const p = useEditor((state) => Object.values(state.elements))

  useControls(() => {
    const items: Record<string, any> = {}
    p.forEach((v) => {
      if (v.parentId == null) items[v.id] = v
    })

    return {
      scene: folder(
        {
          graph: tree({
            items
          })
        },
        {
          order: -2
        }
      )
    }
  }, [p])
  return null
}
