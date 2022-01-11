package main

import (
	"net/http"
	"os"
	"path/filepath"
)

// stores paths for static file server (single page application)
type SpaHandler struct {
	staticPath string
	indexPath  string
}

// serve static files (react app)
func (s SpaHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	path, err := filepath.Abs(r.URL.Path)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	path = filepath.Join(s.staticPath, path)

	_, err = os.Stat(path)
	if os.IsNotExist(err) {
		http.ServeFile(w, r, filepath.Join(s.staticPath, s.indexPath))
		return
	} else if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	http.FileServer(http.Dir(s.staticPath)).ServeHTTP(w, r)
}
