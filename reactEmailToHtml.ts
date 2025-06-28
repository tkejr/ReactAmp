import React from 'react';
import ReactDOMServer from 'react-dom/server';

/**
 * Renders a React email component to static HTML string with proper DOCTYPE
 */
export function renderEmailToHTML(EmailComponent: React.ComponentType, props?: any): string {
  console.log('props', EmailComponent);
  const element = React.createElement(EmailComponent, props);

  // Recursively clone elements and add _renderMode: 'html' prop
  function addRenderModeProp(node: any): any {
    if (!node || typeof node === 'string' || typeof node === 'number') {
      return node;
    }
    if (Array.isArray(node)) {
      return node.map(addRenderModeProp);
    }
    if (React.isValidElement(node)) {
      // Ensure props is always an object
      const safeProps = Object(node.props);
      // Merge _renderMode with existing props
      const newProps = { ...safeProps, _renderMode: 'html' };
      // Recursively apply to children
      if (safeProps && safeProps.children) {
        newProps.children = addRenderModeProp(safeProps.children);
      }
      return React.cloneElement(node, newProps);
    }
    return node;
  }

  // If the root is a function or class component, render it to get its children
  let rendered = element;
  if (typeof element.type === 'function') {
    if (element.type.prototype && element.type.prototype.isReactComponent) {
      const instance = new (element.type as any)(element.props);
      rendered = instance.render();
    } else {
      rendered = (element.type as Function)(element.props);
    }
  }

  // Now inject _renderMode: 'html' into the rendered tree
  const renderedWithRenderMode = addRenderModeProp(rendered);

  // Enhanced debug logger for children
  function printChildren(node: any, depth = 0) {
    if (!node) {
      console.log(' '.repeat(depth * 2) + '[null/undefined node]');
      return;
    }
    const indent = '  '.repeat(depth);
    if (Array.isArray(node)) {
      console.log(`${indent}[Array of ${node.length}]`);
      node.forEach(child => printChildren(child, depth + 1));
      return;
    }
    if (typeof node === 'string' || typeof node === 'number') {
      console.log(`${indent}- ${node}`);
      return;
    }
    if (node && node.type) {
      const typeName = typeof node.type === 'string' ? node.type : (node.type.name || 'Component');
      console.log(`${indent}<${typeName}>`);
      if (node.props) {
        if ('_renderMode' in node.props) {
          console.log(`${indent}  _renderMode:`, node.props._renderMode);
        }
        const childKeys = Object.keys(node.props).filter(k => k !== 'children' && k !== '_renderMode');
        if (childKeys.length > 0) {
          console.log(`${indent}  props:`, childKeys.map(k => `${k}=${JSON.stringify(node.props[k])}`).join(', '));
        }
        if (node.props.children) {
          printChildren(node.props.children, depth + 1);
        } else {
          console.log(`${indent}  [no children]`);
        }
      } else {
        console.log(`${indent}  [no props]`);
      }
    } else {
      console.log(`${indent}[Unknown node type]:`, node);
    }
  }

  console.log('--- Printing all children of the rendered root element ---');
  printChildren(renderedWithRenderMode);
  console.log('--- End children ---');

  const html = ReactDOMServer.renderToStaticMarkup(renderedWithRenderMode);
  const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Email</title>
</head>
<body>
  ${html}
</body>
</html>`;
  return fullHtml;
} 