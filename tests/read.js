/**
 * Graphology Read Specs
 * ======================
 *
 * Testing the read methods of the graph.
 */
import assert from 'assert';

export default function read(Graph, checkers) {
  const {
    invalid,
    notFound
  } = checkers;

  return {
    '#.hasNode': {

      'it should correctly return whether the given node is found in the graph.': function() {
        const graph = new Graph();

        assert.strictEqual(graph.hasNode('John'), false);

        graph.addNode('John');

        assert.strictEqual(graph.hasNode('John'), true);
      }
    },

    '#.getDirectedEdge': {
      'it should return undefined if no matching edge is found.': function() {
        const graph = new Graph();

        assert.strictEqual(graph.getDirectedEdge('John', 'Catherine'), undefined);
      },

      'it should return the first matching edge.': function() {
        const graph = new Graph();
        graph.addNode('Martha');
        graph.addNode('Catherine');
        graph.addNode('John');
        graph.addDirectedEdgeWithKey('M->C', 'Martha', 'Catherine');
        graph.addUndirectedEdge('Catherine', 'John');

        graph.getDirectedEdge('Martha', 'Catherine');
        assert.strictEqual(graph.getDirectedEdge('Martha', 'Catherine'), 'M->C');
        assert.strictEqual(graph.getDirectedEdge('Catherine', 'John'), undefined);
      }
    },

    '#.getUndirectedEdge': {
      'it should return undefined if no matching edge is found.': function() {
        const graph = new Graph();

        assert.strictEqual(graph.getUndirectedEdge('John', 'Catherine'), undefined);
      },

      'it should return the first matching edge.': function() {
        const graph = new Graph();
        graph.addNode('Martha');
        graph.addNode('Catherine');
        graph.addNode('John');
        graph.addDirectedEdge('Catherine', 'John');
        graph.addUndirectedEdgeWithKey('M<->C', 'Martha', 'Catherine');

        assert.strictEqual(graph.getUndirectedEdge('Catherine', 'John'), undefined);
        assert.strictEqual(graph.getUndirectedEdge('Martha', 'Catherine'), 'M<->C');
        assert.strictEqual(graph.getUndirectedEdge('Catherine', 'Martha'), 'M<->C');
      }
    },

    '#.getEdge': {
      'it should return undefined if no matching edge is found.': function() {
        const graph = new Graph();

        assert.strictEqual(graph.getEdge('John', 'Catherine'), undefined);
      },

      'it should return the first matching edge.': function() {
        const graph = new Graph();
        graph.addNode('Martha');
        graph.addNode('Catherine');
        graph.addDirectedEdgeWithKey('M->C', 'Martha', 'Catherine');

        assert.strictEqual(graph.getEdge('Martha', 'Catherine'), 'M->C');
      },

      'it should return a directed edge before an undirected one.': function() {
        const graph = new Graph(null, {multi: true});
        graph.addNode('Martha');
        graph.addNode('Catherine');
        graph.addNode('John');

        graph.addDirectedEdgeWithKey('M->C', 'Martha', 'Catherine');
        graph.addUndirectedEdgeWithKey('M<->C', 'Martha', 'Catherine');
        graph.addUndirectedEdgeWithKey('C<->J', 'Catherine', 'John');

        assert.strictEqual(graph.getEdge('Martha', 'Catherine'), 'M->C');
        assert.strictEqual(graph.getEdge('Catherine', 'John'), 'C<->J');
      }
    },

    '#.hasDirectedEdge': {

      'it should throw if invalid arguments are provided.': function() {
        const graph = new Graph();

        assert.throws(function() {
          graph.hasDirectedEdge(1, 2, 3);
        }, invalid());
      },

      'it should correctly return whether a matching edge exists in the graph.': function() {
        const graph = new Graph();
        graph.addNode('Martha');
        graph.addNode('Catherine');
        graph.addNode('John');
        graph.addDirectedEdgeWithKey('M->C', 'Martha', 'Catherine');
        graph.addUndirectedEdgeWithKey('C<->J', 'Catherine', 'John');

        assert.strictEqual(graph.hasDirectedEdge('M->C'), true);
        assert.strictEqual(graph.hasDirectedEdge('C<->J'), false);
        assert.strictEqual(graph.hasDirectedEdge('test'), false);
        assert.strictEqual(graph.hasDirectedEdge('Martha', 'Catherine'), true);
        assert.strictEqual(graph.hasDirectedEdge('Martha', 'Thomas'), false);
        assert.strictEqual(graph.hasDirectedEdge('Catherine', 'John'), false);
        assert.strictEqual(graph.hasDirectedEdge('John', 'Catherine'), false);
      }
    },

    '#.hasUndirectedEdge': {

      'it should throw if invalid arguments are provided.': function() {
        const graph = new Graph();

        assert.throws(function() {
          graph.hasUndirectedEdge(1, 2, 3);
        }, invalid());
      },

      'it should correctly return whether a matching edge exists in the graph.': function() {
        const graph = new Graph();
        graph.addNode('Martha');
        graph.addNode('Catherine');
        graph.addNode('John');
        graph.addDirectedEdgeWithKey('M->C', 'Martha', 'Catherine');
        graph.addUndirectedEdgeWithKey('C<->J', 'Catherine', 'John');

        assert.strictEqual(graph.hasUndirectedEdge('M->C'), false);
        assert.strictEqual(graph.hasUndirectedEdge('C<->J'), true);
        assert.strictEqual(graph.hasUndirectedEdge('test'), false);
        assert.strictEqual(graph.hasUndirectedEdge('Martha', 'Catherine'), false);
        assert.strictEqual(graph.hasUndirectedEdge('Martha', 'Thomas'), false);
        assert.strictEqual(graph.hasUndirectedEdge('Catherine', 'John'), true);
        assert.strictEqual(graph.hasUndirectedEdge('John', 'Catherine'), true);
      }
    },

    '#.hasEdge': {

      'it should throw if invalid arguments are provided.': function() {
        const graph = new Graph();

        assert.throws(function() {
          graph.hasEdge(1, 2, 3);
        }, invalid());
      },

      'it should correctly return whether a matching edge exists in the graph.': function() {
        const graph = new Graph();
        graph.addNode('Martha');
        graph.addNode('Catherine');
        graph.addNode('John');
        graph.addDirectedEdgeWithKey('M->C', 'Martha', 'Catherine');
        graph.addUndirectedEdgeWithKey('C<->J', 'Catherine', 'John');

        assert.strictEqual(graph.hasEdge('M->C'), true);
        assert.strictEqual(graph.hasEdge('C<->J'), true);
        assert.strictEqual(graph.hasEdge('test'), false);
        assert.strictEqual(graph.hasEdge('Martha', 'Catherine'), true);
        assert.strictEqual(graph.hasEdge('Martha', 'Thomas'), false);
        assert.strictEqual(graph.hasEdge('Catherine', 'John'), true);
        assert.strictEqual(graph.hasEdge('John', 'Catherine'), true);
      }
    },

    '#.source': {

      'it should throw if the edge is not in the graph.': function() {
        const graph = new Graph();

        assert.throws(function() {
          graph.source('test');
        }, notFound());
      },

      'it should return the correct source.': function() {
        const graph = new Graph();
        graph.addNode('John');
        graph.addNode('Martha');

        const edge = graph.addDirectedEdge('John', 'Martha');

        assert.strictEqual(graph.source(edge), 'John');
      }
    },

    '#.target': {

      'it should throw if the edge is not in the graph.': function() {
        const graph = new Graph();

        assert.throws(function() {
          graph.target('test');
        }, notFound());
      },

      'it should return the correct target.': function() {
        const graph = new Graph();
        graph.addNode('John');
        graph.addNode('Martha');

        const edge = graph.addDirectedEdge('John', 'Martha');

        assert.strictEqual(graph.target(edge), 'Martha');
      }
    },

    '#.extremities': {

      'it should throw if the edge is not in the graph.': function() {
        const graph = new Graph();

        assert.throws(function() {
          graph.extremities('test');
        }, notFound());
      },

      'it should return the correct extremities.': function() {
        const graph = new Graph();
        graph.addNode('John');
        graph.addNode('Martha');

        const edge = graph.addDirectedEdge('John', 'Martha');

        assert.deepEqual(graph.extremities(edge), ['John', 'Martha']);
      }
    },

    '#.relatedNode': {

      'it should throw if either the node or the edge is not found in the graph.': function() {
        const graph = new Graph();
        graph.addNode('Thomas');

        assert.throws(function() {
          graph.relatedNode('Jeremy', 'T->J');
        }, notFound());

        assert.throws(function() {
          graph.relatedNode('Thomas', 'T->J');
        }, notFound());
      },

      'it should return the correct node.': function() {
        const graph = new Graph();
        graph.addNodesFrom(['Thomas', 'Estelle']);
        const edge = graph.addEdge('Thomas', 'Estelle');

        assert.strictEqual(
          graph.relatedNode('Thomas', edge),
          'Estelle'
        );
      }
    },

    '#.directed': {

      'it should throw if the edge is not in the graph.': function() {
        const graph = new Graph();

        assert.throws(function() {
          graph.directed('test');
        }, notFound());
      },

      'it should correctly return whether the edge is directed or not.': function() {
        const graph = new Graph();
        graph.addNode('John');
        graph.addNode('Rachel');
        graph.addNode('Suzan');

        const directedEdge = graph.addDirectedEdge('John', 'Rachel'),
              undirectedEdge = graph.addUndirectedEdge('Rachel', 'Suzan');

        assert.strictEqual(graph.directed(directedEdge), true);
        assert.strictEqual(graph.directed(undirectedEdge), false);
      }
    },

    '#.undirected': {

      'it should throw if the edge is not in the graph.': function() {
        const graph = new Graph();

        assert.throws(function() {
          graph.undirected('test');
        }, notFound());
      },

      'it should correctly return whether the edge is undirected or not.': function() {
        const graph = new Graph();
        graph.addNode('John');
        graph.addNode('Rachel');
        graph.addNode('Suzan');

        const directedEdge = graph.addDirectedEdge('John', 'Rachel'),
              undirectedEdge = graph.addUndirectedEdge('Rachel', 'Suzan');

        assert.strictEqual(graph.undirected(directedEdge), false);
        assert.strictEqual(graph.undirected(undirectedEdge), true);
      },
    },

    '#.selfLoop': {
      'it should throw if the edge is not in the graph.': function() {
        const graph = new Graph();

        assert.throws(function() {
          graph.selfLoop('test');
        }, notFound());
      },

      'it should correctly return whether the edge is a self-loop or not.': function() {
        const graph = new Graph();
        graph.addNode('John');
        graph.addNode('Rachel');

        const selfLoop = graph.addDirectedEdge('John', 'John'),
              edge = graph.addUndirectedEdge('John', 'Rachel');

        assert.strictEqual(graph.selfLoop(selfLoop), true);
        assert.strictEqual(graph.selfLoop(edge), false);
      },
    },

    'Degree': {
      '#.inDegree': {

        'it should throw if the second argument is not boolean.': function() {
          const graph = new Graph();
          graph.addNode('Rahn');

          assert.throws(function() {
            graph.inDegree('Rahn', 'test');
          }, invalid());
        },

        'it should throw if the node is not found in the graph.': function() {
          const graph = new Graph();

          assert.throws(function() {
            graph.inDegree('Test');
          }, notFound());
        },

        'it should return the correct in degree.': function() {
          const graph = new Graph();
          graph.addNodesFrom(['Helen', 'Sue', 'William', 'John']);
          graph.addDirectedEdge('Helen', 'Sue');
          graph.addDirectedEdge('William', 'Sue');

          assert.strictEqual(graph.inDegree('Sue'), 2);

          graph.addDirectedEdge('Sue', 'Sue');

          assert.strictEqual(graph.inDegree('Sue'), 3);
          assert.strictEqual(graph.inDegree('Sue', false), 2);
        }
      },

      '#.outDegree': {
        'it should throw if the second argument is not boolean.': function() {
          const graph = new Graph();
          graph.addNode('Rahn');

          assert.throws(function() {
            graph.outDegree('Rahn', 'test');
          }, invalid());
        },

        'it should throw if the node is not found in the graph.': function() {
          const graph = new Graph();

          assert.throws(function() {
            graph.outDegree('Test');
          }, notFound());
        },

        'it should return the correct out degree.': function() {
          const graph = new Graph();
          graph.addNodesFrom(['Helen', 'Sue', 'William', 'John']);
          graph.addDirectedEdge('Helen', 'Sue');
          graph.addDirectedEdge('Helen', 'William');

          assert.strictEqual(graph.outDegree('Helen'), 2);

          graph.addDirectedEdge('Helen', 'Helen');

          assert.strictEqual(graph.outDegree('Helen'), 3);
          assert.strictEqual(graph.outDegree('Helen', false), 2);
        }
      },

      '#.directedDegree': {
        'it should throw if the second argument is not boolean.': function() {
          const graph = new Graph();
          graph.addNode('Rahn');

          assert.throws(function() {
            graph.directedDegree('Rahn', 'test');
          }, invalid());
        },

        'it should throw if the node is not found in the graph.': function() {
          const graph = new Graph();

          assert.throws(function() {
            graph.directedDegree('Test');
          }, notFound());
        },

        'it should return the correct directed degree.': function() {
          const graph = new Graph();
          graph.addNodesFrom(['Helen', 'Sue', 'William', 'John', 'Martha']);
          graph.addDirectedEdge('Helen', 'Sue');
          graph.addDirectedEdge('Helen', 'William');
          graph.addDirectedEdge('Martha', 'Helen');
          graph.addUndirectedEdge('Helen', 'John');

          assert.strictEqual(graph.directedDegree('Helen'), 3);
          assert.strictEqual(
            graph.directedDegree('Helen'),
            graph.inDegree('Helen') + graph.outDegree('Helen')
          );

          graph.addDirectedEdge('Helen', 'Helen');

          assert.strictEqual(graph.directedDegree('Helen'), 4);
          assert.strictEqual(graph.directedDegree('Helen', false), 3);
        }
      },

      '#.undirectedDegree': {
        'it should throw if the second argument is not boolean.': function() {
          const graph = new Graph();
          graph.addNode('Rahn');

          assert.throws(function() {
            graph.undirectedDegree('Rahn', 'test');
          }, invalid());
        },

        'it should throw if the node is not found in the graph.': function() {
          const graph = new Graph();

          assert.throws(function() {
            graph.undirectedDegree('Test');
          }, notFound());
        },

        'it should return the correct undirected degree.': function() {
          const graph = new Graph();
          graph.addNodesFrom(['Helen', 'Sue', 'William', 'John']);
          graph.addDirectedEdge('Helen', 'Sue');
          graph.addDirectedEdge('Helen', 'William');
          graph.addUndirectedEdge('Helen', 'John');

          assert.strictEqual(graph.undirectedDegree('Helen'), 1);

          graph.addUndirectedEdge('Helen', 'Helen');

          assert.strictEqual(graph.undirectedDegree('Helen'), 2);
          assert.strictEqual(graph.undirectedDegree('Helen', false), 1);
        }
      },

      '#.degree': {
        'it should throw if the second argument is not boolean.': function() {
          const graph = new Graph();
          graph.addNode('Rahn');

          assert.throws(function() {
            graph.degree('Rahn', 'test');
          }, invalid());
        },

        'it should throw if the node is not found in the graph.': function() {
          const graph = new Graph();

          assert.throws(function() {
            graph.degree('Test');
          }, notFound());
        },

        'it should return the correct degree.': function() {
          const graph = new Graph();
          graph.addNodesFrom(['Helen', 'Sue', 'William', 'John', 'Martha']);
          graph.addDirectedEdge('Helen', 'Sue');
          graph.addDirectedEdge('Helen', 'William');
          graph.addDirectedEdge('Martha', 'Helen');
          graph.addUndirectedEdge('Helen', 'John');

          assert.strictEqual(graph.degree('Helen'), 4);
          assert.strictEqual(
            graph.degree('Helen'),
            graph.directedDegree('Helen') + graph.undirectedDegree('Helen')
          );

          graph.addUndirectedEdge('Helen', 'Helen');

          assert.strictEqual(graph.degree('Helen'), 5);
          assert.strictEqual(graph.degree('Helen', false), 4);
        }
      }
    }
  };
}
