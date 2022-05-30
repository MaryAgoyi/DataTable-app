import React from 'react'
import { deleteTable, getData,Tablerow } from '../features/dataTable/dataTableSlice'
import { useAppDispatch, useAppSelector } from '../Redux/hooks'

import TreeView from '@mui/lab/TreeView'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import TreeItem from '@mui/lab/TreeItem'
import ClearIcon from '@mui/icons-material/Clear'
import { IconButton } from '@mui/material'
import './dataTable.css'

const DataTable = () => {
  const datafile = useAppSelector(getData)

  const dispatch = useAppDispatch()

  const handleClick = (node: Tablerow, array: Tablerow[]) => {
    let treeData = [...array]
    const status = treeData.includes(node)
    if (status) {
      treeData = treeData.filter((value) => value !== node)
    }

    treeData.map((item) => {
      Object.entries(item.kids)?.map(([key, value]) => {
        return [value?.records.filter((i) => i !== node)]
      })
    })
    dispatch(deleteTable(treeData))
  }

  const renderTree = (nodes: Tablerow[]) => (
    <React.Fragment>
      <div className='header'>
        {Object.keys(nodes[0].data).map((item, i) => (
          <div className='header-content' key={i}>
            {item}
          </div>
        ))}
        <div></div>
      </div>

      {nodes.map((node, index) => (
        <TreeItem
          key={index}
          nodeId={Object.values(node.data)[0]}
          label={
            <div className='main'>
              {Object.entries(node.data).map(([key, value]) => (
                <div className='main-body' key={key}>
                  {value}
                </div>
              ))}

              <div className='main-button'>
                <IconButton
                  aria-label='expand row'
                  size='small'
                  onClick={() => handleClick(node, datafile)}
                >
                  {<ClearIcon />}
                </IconButton>
              </div>
            </div>
          }
        >
          {Object.keys(node.kids).length !== 0 ? (
            <React.Fragment>
              <div>
                <div className='main-label'> {Object.keys(node.kids)}</div>
              </div>
              {Object.entries(node.kids)?.map(([key, value]) => (
                <div key={key}>{value?.records ? renderTree(value?.records) : null}</div>
              ))}
            </React.Fragment>
          ) : null}
        </TreeItem>
      ))}
    </React.Fragment>
  )

  return (
    <TreeView defaultCollapseIcon={<ExpandMoreIcon />} defaultExpandIcon={<ChevronRightIcon />}>
      {renderTree(datafile)}{' '}
    </TreeView>
  )
}

export default DataTable
