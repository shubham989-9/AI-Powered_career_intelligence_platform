import sys
import os
from pathlib import Path

# Add backend folder to sys.path
backend_dir = os.path.join(os.path.dirname(__file__), "..", "backend")
sys.path.insert(0, backend_dir)

from app.main import app