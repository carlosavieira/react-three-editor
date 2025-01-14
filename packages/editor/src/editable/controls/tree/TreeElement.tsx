import { useState } from "react"
import { EditableElement } from "../../EditableElement"
import React from "react"
import { LevaPanel } from "leva"
import { TreeItem } from "./TreeItem"
import { ElementIcon } from "./ElementIcon"
import { StyledIcon } from "../folder/StyledFolder"
import { OpenInEditorButton } from "./OpenInEditorButton"

export function TreeElement({
  collapsed = false,
  onCollapse,
  element,
  showChildren = false,
  panel = false
}: {
  collapsed: boolean
  onCollapse?: (c: boolean) => void
  element: EditableElement
  showChildren?: boolean
  panel?: boolean
  collapsible?: boolean
}) {
  const selected = element.editor.store((s) => s.selected === element)

  const [_collapsed, setCollapsed] = useState(collapsed)

  const [visible, setVisible] = useState(
    element.ref?.visible || (true as boolean)
  )

  const state = element.editor.store((state) => state.elements)

  return (
    <TreeItem
      collapsed={_collapsed}
      setCollapsed={(c) => {
        onCollapse?.(c)
        setCollapsed(c)
      }}
      visible={visible}
      selected={selected}
      collapsible={
        panel
          ? true
          : !showChildren
          ? false
          : element.children.length
          ? true
          : false
      }
      remeasure={panel}
      title={
        <>
          <ElementIcon element={element} />
          <div
            style={{ marginLeft: "4px" }}
            onClick={(e) =>
              element.editor.store.setState({
                selected: element
              })
            }
          >
            {element.displayName}
          </div>
          <div style={{ marginLeft: "auto" }} />
          <OpenInEditorButton element={element} />
          <StyledIcon
            icon={visible ? "ph:eye-bold" : "ph:eye-closed-bold"}
            style={{
              marginLeft: 2
            }}
            onClick={(e) => (
              setVisible((v) => !v), (element.visible = !element.visible)
            )}
          />
        </>
      }
    >
      {!_collapsed && showChildren && (
        <div
          style={{
            marginLeft: "2px",
            marginTop: "2px"
          }}
        >
          {element.children
            .filter((c) => c !== element.id)
            .map((c) => (
              <TreeElement
                element={state[c]}
                key={c}
                collapsed={true}
                showChildren
              />
            ))}
        </div>
      )}
      {panel && (
        <LevaPanel
          fill
          titleBar={false}
          flat
          hideCopyButton
          theme={{
            space: {
              rowGap: "2px",
              md: "6px",
              sm: "4px"
            }
          }}
          store={element.store}
        />
      )}
    </TreeItem>
  )
}
