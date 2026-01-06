.PHONY: help build clean test

# Default target
help:
	@echo "Available targets:"
	@echo "  make build    - Generate index.html from template"
	@echo "  make clean    - Remove generated index.html"
	@echo "  make test     - Test the build process"
	@echo ""
	@echo "Environment variables:"
	@echo "  GOOGLE_ANALYTICS_STREAM_ID - Google Analytics 4 Measurement ID"
	@echo ""
	@echo "Usage:"
	@echo "  GOOGLE_ANALYTICS_STREAM_ID=G-XXXXXXXXXX make build"
	@echo "  Or create a .env file with GOOGLE_ANALYTICS_STREAM_ID=G-XXXXXXXXXX"

# Generate index.html from template
build:
	@./inject-env.sh

# Remove generated files
clean:
	@rm -f index.html
	@echo "Cleaned generated files"

# Test the build process
test: clean
	@echo "Testing build process..."
	@GOOGLE_ANALYTICS_STREAM_ID=G-TESTID123 ./inject-env.sh
	@if [ -f index.html ]; then \
		echo "✓ index.html generated successfully"; \
		grep -q "G-TESTID123" index.html && echo "✓ GA ID injected correctly" || (echo "✗ GA ID not found" && exit 1); \
	else \
		echo "✗ index.html not generated" && exit 1; \
	fi
	@rm -f index.html
	@echo "✓ All tests passed"
