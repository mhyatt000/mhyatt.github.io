"""
no cache server
- this means that local changes SHOULD occur on the browser
"""

import http.server
import socketserver

class NoCacheHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

PORT = 8000

with socketserver.TCPServer(("", PORT), NoCacheHTTPRequestHandler) as httpd:
    print("Serving at port", PORT)
    httpd.serve_forever()
