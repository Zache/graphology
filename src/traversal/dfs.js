/**
 * Graphology Traversal DFS
 * =========================
 *
 * Depth-First Search traversal function.
 */
var isGraph = require('graphology-utils/is-graph');
var DFSStack = require('graphology-indices/dfs-stack');
var utils = require('./utils');

var TraversalRecord = utils.TraversalRecord;
var capitalize = utils.capitalize;

/**
 * DFS traversal in the given graph using a callback function
 *
 * @param {Graph}    graph        - Target graph.
 * @param {string}   startingNode - Optional Starting node.
 * @param {function} callback     - Iteration callback.
 * @param {object}   options      - Options:
 * @param {string}     mode         - Traversal mode.
 */
function abstractDfs(graph, startingNode, callback, options) {
  options = options || {};

  if (!isGraph(graph))
    throw new Error(
      'graphology-traversal/dfs: expecting a graphology instance.'
    );

  if (typeof callback !== 'function')
    throw new Error(
      'graphology-traversal/dfs: given callback is not a function.'
    );

  // Early termination
  if (graph.order === 0) return;

  var forEachNeighbor =
    graph['forEach' + capitalize(options.mode || 'outbound') + 'Neighbor'].bind(
      graph
    );

  var forEachNode;

  if (startingNode === null) {
    forEachNode = graph.forEachNode.bind(graph);
  } else {
    forEachNode = function (fn) {
      startingNode = '' + startingNode;
      fn(startingNode, graph.getNodeAttributes(startingNode));
    };
  }

  var stack = new DFSStack(graph.order);
  var record, stop;

  function visit(neighbor, attr) {
    stack.pushWith(
      neighbor,
      new TraversalRecord(neighbor, attr, record.depth + 1)
    );
  }

  forEachNode(function (node, attr) {
    if (stack.has(node)) return;

    stack.pushWith(node, new TraversalRecord(node, attr, 0));

    while (stack.size !== 0) {
      record = stack.pop();

      stop = callback(record.node, record.attributes, record.depth);

      if (stop === true) continue;

      forEachNeighbor(record.node, visit);
    }
  });
}

exports.dfs = function (graph, callback, options) {
  return abstractDfs(graph, null, callback, options);
};
exports.dfsFromNode = abstractDfs;
